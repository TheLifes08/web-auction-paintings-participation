const settings = require("./settings.json");
const paintings = require("@rkolovanov/web-auction-paintings/storage/paintings.json");
const users = require("@rkolovanov/web-auction-paintings/storage/users.json");
const auctionSettings = require("@rkolovanov/web-auction-paintings/storage/auction-settings.json");

const storage = {
    settings,
    auctionSettings,
    paintings,
    users
};

module.exports = storage;