const express = require("express");
const passport = require("passport");
const storage = require("../../storage");

const router = express.Router();

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.render("administration", {
        auctionSettings: storage.auctionSettings,
        authenticated: request.isAuthenticated(),
        user: request.user
    });
});

module.exports = router;