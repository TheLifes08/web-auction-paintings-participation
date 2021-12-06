const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    response.render("registration", {
        authenticated: request.isAuthenticated(),
        user: request.user
    });
});

module.exports = router;
