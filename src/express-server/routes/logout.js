const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    request.logout();
    response.redirect("/");
});

module.exports = router;