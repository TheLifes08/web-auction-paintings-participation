let currentUser = null;
let currentAuctionState = null;
let socket = io.connect("http://localhost:8090");

updateUserInfo((user) => {
    socket.emit("user-connection", user);
    socket.emit("get-auction-state");
});

socket.on("status-message", (data) => {
   printMessage(data.message);
});

socket.on("bet-status", (data) => {
    let messageContainer = $("#make-bet-form-message");

    $("#make-bet-form-message-p").text(data.message);
    messageContainer.hide();

    if (data.success) {
        messageContainer.addClass("w3-green");
        messageContainer.removeClass("w3-red");
        messageContainer.show("drop", 600);
    } else {
        messageContainer.addClass("w3-red");
        messageContainer.removeClass("w3-green");
        messageContainer.show("shake", 600);
    }
});

socket.on("auction-state", (data) => {
    currentAuctionState = data;

    let estimateMinutes, estimateSeconds;

    if (data.currentEndDateTime && data.currentDateTime) {
        data.currentDateTime = new Date(data.currentDateTime);
        data.currentEndDateTime = new Date(data.currentEndDateTime);
        estimateSeconds = Math.floor((data.currentEndDateTime.valueOf() - data.currentDateTime.valueOf()) / 1000);
        estimateMinutes = Math.floor(estimateSeconds / 60);
        estimateSeconds = estimateSeconds % 60;

        if (estimateSeconds < 10) {
            estimateSeconds = `0${estimateSeconds}`;
        }

        if (estimateMinutes < 10) {
            estimateMinutes = `0${estimateMinutes}`;
        }
    }

    let auctionStatusTitle = $("#auction-status-title");
    let paintingContainer = $("#painting-container");
    let paintingBetInfo = $("#painting-bet-info");
    let makeBetButton = $("#show-bet-dialog-button");

    switch (data.currentStage) {
        case "pause":
            auctionStatusTitle.text(`Изучение информации о картине [${estimateMinutes}:${estimateSeconds}]`);
            paintingContainer.show();
            paintingBetInfo.show();
            break;
        case "wait_for_bet":
            auctionStatusTitle.text(`Прием ставок по картине [${estimateMinutes}:${estimateSeconds}]`);
            paintingContainer.show();
            paintingBetInfo.show();
            break;
        default:
            if (!data.started) {
                auctionStatusTitle.text("Аукцион еще не начался.");
            } else if (data.finished) {
                auctionStatusTitle.text("Аукцион окончен.");
            }
            paintingContainer.hide();
            paintingBetInfo.hide();
    }

    makeBetButton.prop("disabled", data.currentStage !== "wait_for_bet");

    if (data.currentPainting) {
        $("#painting-title").text(data.currentPainting.title);
        $("#painting-author").text(data.currentPainting.author);
        $("#painting-start-price").text(data.currentPainting.startPrice);
        $("#painting-min-step").text(data.currentPainting.minimalPriceStep);
        $("#painting-max-step").text(data.currentPainting.maximumPriceStep);
        $("#painting-desc").text(data.currentPainting.description);
        $("#painting-image").attr("src", "/public/images/paintings/" + data.currentPainting.imageName);
        $("#painting-current-price").text((data.currentPrice !== data.currentPainting.startPrice)? data.currentPrice : "-");
        $("#painting-current-buyer").text((data.currentBuyer)? data.currentBuyer.name : "-");
    }
});

socket.on("painting-sold", () => {
    updateUserInfo();
});

$(document).ready(() => {
    $("#show-bet-dialog-button").on("click", () => {
        let currentPrice = currentAuctionState.currentPrice;
        let minimalPriceStep = currentAuctionState.currentPainting.minimalPriceStep;
        $("#make-bet-form-price").val(currentPrice + minimalPriceStep);
        $("#modal-make-bet").show();
        checkBetForm();
    });

    $("#make-bet-form-message-close").on("click", () => {
        $("#make-bet-form-message").hide();
    });

    $("#make-bet-form-submit").on("click", () => {
        socket.emit("bet", {
           user: currentUser,
           bet: $("#make-bet-form-price").val()
        });
    });
});

function updateUserInfo(callback) {
    $.get("/storage/users/current").done((user) => {
        if (user) {
            currentUser = user;
            $("#user-balance").text(user.balance);
            if (callback) callback(user);
        }
    });
}

function checkBetForm() {
    let currentPrice = currentAuctionState.currentPrice;
    let minimalPriceStep = currentAuctionState.currentPainting.minimalPriceStep;
    let maximalPriceStep = currentAuctionState.currentPainting.maximumPriceStep;
    let newPrice = $("#make-bet-form-price").val();
    let correct = newPrice >= currentPrice + minimalPriceStep && newPrice <= currentPrice + maximalPriceStep;
    $("#make-bet-form-submit").prop("disabled", !correct);
}

function closeBetForm() {
    $("#modal-make-bet").hide();
    $("#make-bet-form-message").hide();
}

function printMessage(message) {
    let date = new Date();
    $("#status-textarea").append(`[${date.toLocaleTimeString()}] ${message}\n`);
}