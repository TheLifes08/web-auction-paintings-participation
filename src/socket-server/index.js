const logger = require("../logging");
const storage = require("../storage");
const sockets = require("socket.io");

const Stage = {
   PAUSE: "pause",
   WAIT_FOR_BET: "wait_for_bet"
};

let auctionState = {
   settings: storage.auctionSettings,
   startDateTime: new Date(storage.auctionSettings.datetime),
   paintings: storage.paintings.filter(painting => painting.placedOnAuction),
   started: false,
   finished: false,
   currentPainting: null,
   currentPrice: null,
   currentBuyer: null,
   currentEndDateTime: null,
   currentStage: null,
   currentDateTime: null
}

const server = new sockets.Server({
   cors: {
      origin: "*"
   }
});

let serverInterval = setInterval(onServerUpdate, 500);

function onServerUpdate() {
   auctionState.currentDateTime = new Date();

   if (auctionState.finished) {
      logger.info("Auction finished.");
      server.emit("status-message", {message: `Аукцион окончен.`});
      clearInterval(serverInterval);
      serverInterval = null;
      return;
   }

   if (auctionState.started) {
      if (auctionState.currentStage === Stage.PAUSE) {
         if (auctionState.currentDateTime.getTime() >= auctionState.currentEndDateTime.getTime()) {
            auctionState.currentStage = Stage.WAIT_FOR_BET;
            auctionState.currentEndDateTime = new Date(auctionState.currentDateTime.getTime() + auctionState.settings.auctionTimeout * 1000 + 500);
            logger.info(`The beginning of accepting bets on the painting '${auctionState.currentPainting.title}'.`);
            server.emit("status-message", {message: `Начало приема ставок по картине '${auctionState.currentPainting.title}'.`});
         }
      } else if (auctionState.currentStage === Stage.WAIT_FOR_BET) {
         if (auctionState.currentDateTime.getTime() >= auctionState.currentEndDateTime.getTime()) {
            if (auctionState.currentBuyer) {
               auctionState.currentBuyer.balance -= auctionState.currentPrice;
               auctionState.currentPainting.holder = auctionState.currentBuyer.name;
               auctionState.currentPainting.price = auctionState.currentPrice;
               logger.info(`The acceptance of bets is completed. Painting '${auctionState.currentPainting.title}' was sold to user '${auctionState.currentBuyer.name}'.`);
               server.emit("painting-sold");
               server.emit("status-message", {message: `Прием ставок завершен. Картина '${auctionState.currentPainting.title}' продана пользователю '${auctionState.currentBuyer.name}'.`});
            } else {
               logger.info(`The acceptance of bets is completed. Painting '${auctionState.currentPainting.title}' was not sold.`);
               server.emit("status-message", {message: `Прием ставок завершен. Картина '${auctionState.currentPainting.title}' не была продана.`});
            }

            auctionState.paintings.splice(0, 1);
            auctionState.currentPainting = null;
            auctionState.currentPrice = null;
            auctionState.currentBuyer = null;
            auctionState.currentEndDateTime = null;
            auctionState.currentStage = null;
            auctionState.currentDateTime = null;

            if (auctionState.paintings.length === 0) {
               auctionState.finished = true;
            }
         }
      } else {
         auctionState.currentPainting = auctionState.paintings[0];
         auctionState.currentPrice = auctionState.currentPainting.startPrice;
         auctionState.currentEndDateTime = new Date(auctionState.currentDateTime.getTime() + auctionState.settings.pauseTimeout * 1000 + 500);
         auctionState.currentStage = Stage.PAUSE;
         logger.info(`The beginning of trading on the painting '${auctionState.currentPainting.title}'.`);
         server.emit("status-message", {message: `Начало торгов по картине '${auctionState.currentPainting.title}'.`});
      }

      server.emit("auction-state", auctionState);

      return;
   }

   if (auctionState.currentDateTime.getTime() >= auctionState.startDateTime.getTime()) {
      auctionState.started = true;
      if (auctionState.paintings.length === 0) {
         auctionState.finished = true;
      }
      logger.info("Auction started.");
      server.emit("status-message", {message: `Аукцион начался.`});
   }
}

server.on("connection", (socket) => {
   let userName = null;

   logger.info("New connection established.");

   socket.on("user-connection", (data) => {
      if (data) {
         logger.info(`User '${data.name}' connected.`);
         server.emit("status-message", { message: `Пользователь '${data.name}' присоеденился.` });
         userName = data.name;
      }
   });

   socket.on("get-auction-state", () => {
      socket.emit("auction-state", auctionState);
   });

   socket.on("bet", (data) => {
      let bet = data.bet;
      let user = null;

      if (data.user) {
         user = storage.users.find(user => user.id === data.user.id);
      }

      if (user && bet) {
         if (auctionState.currentStage !== Stage.WAIT_FOR_BET) {
            socket.emit("bet-status", { success: false, message: "На данный момент предложения о новых ценах не принимаются." });
            return;
         }

         if (auctionState.currentPrice + auctionState.currentPainting.minimalPriceStep <= bet &&
             auctionState.currentPrice + auctionState.currentPainting.maximumPriceStep >= bet) {
            if (bet <= user.balance) {
               auctionState.currentPrice = Number(bet);
               auctionState.currentBuyer = user;
               auctionState.currentEndDateTime = new Date(new Date().getTime() + auctionState.settings.betTimeout * 1000 + 500);
               logger.info(`User '${user.name}' placed a bet of '${bet}'.`);
               socket.emit("bet-status", { success: true, message: "Новая цена успешно предложена." });
               server.emit("status-message", { message: `Пользователь '${user.name}' сделал ставку в размере '${bet}'.` });
            } else {
               socket.emit("bet-status", { success: false, message: "На балансе не хватает средств." });
            }
         } else {
            if (auctionState.currentPrice + auctionState.currentPainting.minimalPriceStep > bet) {
               socket.emit("bet-status", { success: false, message: "Новая цена меньше минимально возможного значения." });
            } else {
               socket.emit("bet-status", { success: false, message: "Новая цена больше максимально возможного значения." });
            }
         }
      }
   });

   socket.on("disconnect", () => {
      if (userName) {
         logger.info(`User '${userName}' disconnected.`);
         server.emit("status-message", {message: `Пользователь '${userName}' вышел.`});
      }
   });
});

module.exports = server;