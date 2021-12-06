const express = require("express");
const passport = require("passport");

const routesLogin = require("./login");
const routesLogout = require("./logout");
const routesStorage = require("./storage");
const routerPaintings = require("./paintings");
const routesRegistration = require("./registration");
const routesAdministration = require("./administration");
const storage = require("../../storage");

const router = express.Router();

router.use("/login", routesLogin);
router.use("/logout", routesLogout);
router.use("/storage", routesStorage);
router.use("/paintings", routerPaintings);
router.use("/registration", routesRegistration);
router.use("/administration", routesAdministration);

router.get("/", passport.authenticationMiddleware(), (request, response) => {
    response.render("index", {
        auctionSettings: storage.auctionSettings,
        authenticated: request.isAuthenticated(),
        user: request.user
    });
});

router.get("/*", (request, response) => {
    response.status(404);
    response.render("error", {
        errorStatus: 404,
        errorMessage: "Страница не найдена",
        authenticated: request.isAuthenticated(),
        user: request.user
    });
});

module.exports = router;