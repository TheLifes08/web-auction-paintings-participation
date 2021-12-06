const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");

const logger = require("../logging");
const expressLogger = require("../logging/express");

require("@rkolovanov/web-auction-paintings/authentication").init();
const routesIndex = require("./routes");
const storage = require("../storage");

const server = express();

server.set("view engine", "pug");
server.set("views", "./src/express-server/views");

server.use(expressLogger);
server.use(cookieParser());
server.use(bodyParser.json(storage.settings.bodyParserJsonParameters));
server.use(bodyParser.urlencoded(storage.settings.bodyParserUrlencodedParameters));
server.use(expressSession({ secret: storage.settings.session_secret, resave: false, saveUninitialized: false }));
server.use(passport.initialize({}));
server.use(passport.session({}));
server.use("/public", express.static("./src/express-server/public"));
server.use("/", routesIndex);

server.use(function (error, request, response, next) {
    let errorStatus = 500;
    let errorMessage = "Внутренняя ошибка на сервере";
    response.status(errorStatus);
    response.render("error", {errorStatus, errorMessage, authenticated: request.isAuthenticated()});
    logger.error(error);
});

module.exports = server;