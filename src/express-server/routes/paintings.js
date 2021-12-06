const express = require("express");
const passport = require("passport");
const storage = require("../../storage");

const router = express.Router();

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    let user = request.user;
    let paintings = storage.paintings.filter((painting) => {
       return painting.holder === user.name;
    });
    response.render("paintings", {
        authenticated: request.isAuthenticated(),
        user: request.user,
        paintings
    });
});

module.exports = router;