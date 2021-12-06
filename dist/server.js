/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/express-server/index.js":
/*!*************************************!*\
  !*** ./src/express-server/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nconst expressSession = __webpack_require__(/*! express-session */ \"express-session\");\n\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nconst logger = __webpack_require__(/*! ../logging */ \"./src/logging/index.js\");\n\nconst expressLogger = __webpack_require__(/*! ../logging/express */ \"./src/logging/express.js\");\n\n(__webpack_require__(/*! @rkolovanov/web-auction-paintings/authentication */ \"@rkolovanov/web-auction-paintings/authentication\").init)();\n\nconst routesIndex = __webpack_require__(/*! ./routes */ \"./src/express-server/routes/index.js\");\n\nconst storage = __webpack_require__(/*! ../storage */ \"./src/storage/index.js\");\n\nconst server = express();\nserver.set(\"view engine\", \"pug\");\nserver.set(\"views\", \"./src/express-server/views\");\nserver.use(expressLogger);\nserver.use(cookieParser());\nserver.use(bodyParser.json(storage.settings.bodyParserJsonParameters));\nserver.use(bodyParser.urlencoded(storage.settings.bodyParserUrlencodedParameters));\nserver.use(expressSession({\n  secret: storage.settings.session_secret,\n  resave: false,\n  saveUninitialized: false\n}));\nserver.use(passport.initialize({}));\nserver.use(passport.session({}));\nserver.use(\"/public\", express.static(\"./src/express-server/public\"));\nserver.use(\"/\", routesIndex);\nserver.use(function (error, request, response, next) {\n  let errorStatus = 500;\n  let errorMessage = \"Внутренняя ошибка на сервере\";\n  response.status(errorStatus);\n  response.render(\"error\", {\n    errorStatus,\n    errorMessage,\n    authenticated: request.isAuthenticated()\n  });\n  logger.error(error);\n});\nmodule.exports = server;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/index.js?");

/***/ }),

/***/ "./src/express-server/routes/administration.js":
/*!*****************************************************!*\
  !*** ./src/express-server/routes/administration.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst storage = __webpack_require__(/*! ../../storage */ \"./src/storage/index.js\");\n\nconst router = express.Router();\nrouter.get(\"/\", passport.authenticationMiddleware(), (request, response) => {\n  response.render(\"administration\", {\n    auctionSettings: storage.auctionSettings,\n    authenticated: request.isAuthenticated(),\n    user: request.user\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/administration.js?");

/***/ }),

/***/ "./src/express-server/routes/index.js":
/*!********************************************!*\
  !*** ./src/express-server/routes/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst routesLogin = __webpack_require__(/*! ./login */ \"./src/express-server/routes/login.js\");\n\nconst routesLogout = __webpack_require__(/*! ./logout */ \"./src/express-server/routes/logout.js\");\n\nconst routesStorage = __webpack_require__(/*! ./storage */ \"./src/express-server/routes/storage/index.js\");\n\nconst routerPaintings = __webpack_require__(/*! ./paintings */ \"./src/express-server/routes/paintings.js\");\n\nconst routesRegistration = __webpack_require__(/*! ./registration */ \"./src/express-server/routes/registration.js\");\n\nconst routesAdministration = __webpack_require__(/*! ./administration */ \"./src/express-server/routes/administration.js\");\n\nconst storage = __webpack_require__(/*! ../../storage */ \"./src/storage/index.js\");\n\nconst router = express.Router();\nrouter.use(\"/login\", routesLogin);\nrouter.use(\"/logout\", routesLogout);\nrouter.use(\"/storage\", routesStorage);\nrouter.use(\"/paintings\", routerPaintings);\nrouter.use(\"/registration\", routesRegistration);\nrouter.use(\"/administration\", routesAdministration);\nrouter.get(\"/\", passport.authenticationMiddleware(), (request, response) => {\n  response.render(\"index\", {\n    auctionSettings: storage.auctionSettings,\n    authenticated: request.isAuthenticated(),\n    user: request.user\n  });\n});\nrouter.get(\"/*\", (request, response) => {\n  response.status(404);\n  response.render(\"error\", {\n    errorStatus: 404,\n    errorMessage: \"Страница не найдена\",\n    authenticated: request.isAuthenticated(),\n    user: request.user\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/index.js?");

/***/ }),

/***/ "./src/express-server/routes/login.js":
/*!********************************************!*\
  !*** ./src/express-server/routes/login.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst router = express.Router();\nrouter.get(\"/\", (request, response) => {\n  response.render(\"login\", {\n    authenticated: request.isAuthenticated(),\n    user: request.user\n  });\n});\nrouter.post(\"/\", (request, response) => {\n  if (!request.body.username || !request.body.password) {\n    response.json({\n      error: true,\n      message: \"Имя пользователя или пароль не задан.\"\n    });\n  } else {\n    passport.authenticate(\"local\", {}, (error, user) => {\n      if (error) {\n        response.json({\n          error: true,\n          message: error\n        });\n      } else {\n        request.login(user, function (error) {\n          if (error) {\n            response.json({\n              error: true,\n              message: error\n            });\n          }\n\n          response.json({\n            error: false,\n            message: \"-\"\n          });\n        });\n      }\n    })(request, response);\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/login.js?");

/***/ }),

/***/ "./src/express-server/routes/logout.js":
/*!*********************************************!*\
  !*** ./src/express-server/routes/logout.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\nrouter.get(\"/\", (request, response) => {\n  request.logout();\n  response.redirect(\"/\");\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/logout.js?");

/***/ }),

/***/ "./src/express-server/routes/paintings.js":
/*!************************************************!*\
  !*** ./src/express-server/routes/paintings.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst storage = __webpack_require__(/*! ../../storage */ \"./src/storage/index.js\");\n\nconst router = express.Router();\nrouter.get(\"/\", passport.authenticationMiddleware(), (request, response) => {\n  let user = request.user;\n  let paintings = storage.paintings.filter(painting => {\n    return painting.holder === user.name;\n  });\n  response.render(\"paintings\", {\n    authenticated: request.isAuthenticated(),\n    user: request.user,\n    paintings\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/paintings.js?");

/***/ }),

/***/ "./src/express-server/routes/registration.js":
/*!***************************************************!*\
  !*** ./src/express-server/routes/registration.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\nrouter.get(\"/\", (request, response) => {\n  response.render(\"registration\", {\n    authenticated: request.isAuthenticated(),\n    user: request.user\n  });\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/registration.js?");

/***/ }),

/***/ "./src/express-server/routes/storage/index.js":
/*!****************************************************!*\
  !*** ./src/express-server/routes/storage/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst routerUsers = __webpack_require__(/*! ./users */ \"./src/express-server/routes/storage/users.js\");\n\nconst routerPaintings = __webpack_require__(/*! ./paintings */ \"./src/express-server/routes/storage/paintings.js\");\n\nconst router = express.Router();\nrouter.use(\"/users\", routerUsers);\nrouter.use(\"/paintings\", routerPaintings);\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/storage/index.js?");

/***/ }),

/***/ "./src/express-server/routes/storage/paintings.js":
/*!********************************************************!*\
  !*** ./src/express-server/routes/storage/paintings.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nlet storage = __webpack_require__(/*! ../../../storage */ \"./src/storage/index.js\");\n\nconst router = express.Router();\n\nfunction getPainting(id) {\n  return storage.paintings.find(painting => {\n    return painting.id.toString() === id.toString();\n  });\n}\n\nrouter.get(\"/\", passport.authenticationMiddleware(), (request, response) => {\n  response.json(storage.paintings);\n});\nrouter.get(\"/:paintingId([0-9]{1,})\", passport.authenticationMiddleware(), (request, response) => {\n  let painting = getPainting(request.params.paintingId);\n\n  if (painting) {\n    response.json(painting);\n  } else {\n    response.json(null);\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/storage/paintings.js?");

/***/ }),

/***/ "./src/express-server/routes/storage/users.js":
/*!****************************************************!*\
  !*** ./src/express-server/routes/storage/users.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n\nconst storage = __webpack_require__(/*! ../../../storage */ \"./src/storage/index.js\");\n\nconst router = express.Router();\n\nfunction getUserIds() {\n  let ids = [];\n\n  for (let user of storage.users) {\n    ids.push(user.id);\n  }\n\n  return ids;\n}\n\nfunction createUser(name, password) {\n  let id;\n  let ids = getUserIds();\n  let salt = bcrypt.genSaltSync(10);\n  let hash = bcrypt.hashSync(password, salt);\n\n  for (let i = 1; i <= ids.length + 1; ++i) {\n    if (!ids.includes(i)) {\n      id = i;\n      break;\n    }\n  }\n\n  return {\n    id: id,\n    name: name,\n    passwordHash: hash,\n    balance: 0\n  };\n}\n\nfunction getUser(id) {\n  return storage.users.find(user => {\n    return user.id.toString() === id.toString();\n  });\n}\n\nrouter.get(\"/\", passport.authenticationMiddleware(), (request, response) => {\n  response.json(storage.users);\n});\nrouter.get(\"/current\", passport.authenticationMiddleware(), (request, response) => {\n  response.json(request.user);\n});\nrouter.get(\"/:userId([0-9]{1,})\", passport.authenticationMiddleware(), (request, response) => {\n  let user = getUser(request.params.userId);\n\n  if (user) {\n    response.json(user);\n  } else {\n    response.json(null);\n  }\n});\nrouter.post(\"/\", (request, response) => {\n  let data = request.body;\n\n  if (data && data.username && data.password) {\n    let isExist = storage.users.find(user => {\n      return user.name === data.username;\n    }) !== undefined;\n\n    if (isExist) {\n      response.json({\n        error: true,\n        message: \"Пользователь с таким именем уже существует.\"\n      });\n    } else {\n      storage.users.push(createUser(data.username, data.password));\n      response.json({\n        error: false,\n        message: \"Пользователь успешно зарегистрирован.\"\n      });\n    }\n  } else {\n    response.json({\n      error: true,\n      message: \"Имя пользователя или пароль не задан.\"\n    });\n  }\n});\nrouter.put(\"/\", passport.authenticationMiddleware(), (request, response) => {\n  let userData = request.body;\n\n  if (userData && userData.id) {\n    let user = getUser(userData.id);\n\n    if (userData.balance) {\n      user.balance = Number(userData.balance);\n    }\n\n    if (userData.participate) {\n      user.participate = userData.participate === \"true\";\n    }\n\n    response.json({\n      error: false,\n      message: \"Информация о пользователе успешно обновлена.\"\n    });\n  } else {\n    response.json({\n      error: true,\n      message: \"Пользователь не найден.\"\n    });\n  }\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/express-server/routes/storage/users.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("/*       */\nconst storage = __webpack_require__(/*! ./storage */ \"./src/storage/index.js\");\n\nconst logger = __webpack_require__(/*! ./logging */ \"./src/logging/index.js\");\n\nconst expressServer = __webpack_require__(/*! ./express-server */ \"./src/express-server/index.js\");\n\nconst socketServer = __webpack_require__(/*! ./socket-server */ \"./src/socket-server/index.js\");\n\nsocketServer.listen(storage.settings.listenSocketPort);\nexpressServer.listen(storage.settings.listenHttpPort, storage.settings.listenIP, () => {\n  let message = `Server started at http://${storage.settings.listenIP}:${storage.settings.listenHttpPort}`;\n  logger.info(message);\n});\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/index.js?");

/***/ }),

/***/ "./src/logging/express.js":
/*!********************************!*\
  !*** ./src/logging/express.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const winston = __webpack_require__(/*! winston */ \"winston\");\n\nconst expressWinston = __webpack_require__(/*! express-winston */ \"express-winston\");\n\nconst formatter = winston.format.printf(({\n  level,\n  message,\n  timestamp\n}) => {\n  return `${timestamp} ${level}: ${message}`;\n});\nconst logger = expressWinston.logger({\n  transports: [new winston.transports.Console()],\n  format: winston.format.combine(winston.format.colorize(), winston.format.timestamp({\n    format: 'YYYY-MM-DD HH:mm:ss'\n  }), formatter),\n  expressFormat: true,\n  colorize: true\n});\nmodule.exports = logger;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/logging/express.js?");

/***/ }),

/***/ "./src/logging/index.js":
/*!******************************!*\
  !*** ./src/logging/index.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const winston = __webpack_require__(/*! winston */ \"winston\");\n\nconst RollbarTransport = (__webpack_require__(/*! winston-rollbar */ \"winston-rollbar\").Rollbar);\n\nconst formatter = winston.format.printf(({\n  level,\n  message,\n  timestamp\n}) => {\n  return `${timestamp} ${level}: ${message}`;\n});\nconst logger = winston.createLogger({\n  level: \"debug\",\n  format: winston.format.combine(winston.format.timestamp({\n    format: 'YYYY-MM-DD HH:mm:ss'\n  }), formatter),\n  transports: [new RollbarTransport({\n    rollbarAccessToken: \"bb4e710bba194234855746d0783cabf7\",\n    level: \"info\",\n    rollbarConfig: {\n      environment: \"development\"\n    },\n    silent: true\n  }), new winston.transports.Console(), new winston.transports.File({\n    filename: '../log/combined.log'\n  })]\n});\nmodule.exports = logger;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/logging/index.js?");

/***/ }),

/***/ "./src/socket-server/index.js":
/*!************************************!*\
  !*** ./src/socket-server/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const logger = __webpack_require__(/*! ../logging */ \"./src/logging/index.js\");\n\nconst storage = __webpack_require__(/*! ../storage */ \"./src/storage/index.js\");\n\nconst sockets = __webpack_require__(/*! socket.io */ \"socket.io\");\n\nconst Stage = {\n  PAUSE: \"pause\",\n  WAIT_FOR_BET: \"wait_for_bet\"\n};\nlet auctionState = {\n  settings: storage.auctionSettings,\n  startDateTime: new Date(storage.auctionSettings.datetime),\n  paintings: storage.paintings.filter(painting => painting.placedOnAuction),\n  started: false,\n  finished: false,\n  currentPainting: null,\n  currentPrice: null,\n  currentBuyer: null,\n  currentEndDateTime: null,\n  currentStage: null,\n  currentDateTime: null\n};\nconst server = new sockets.Server({\n  cors: {\n    origin: \"*\"\n  }\n});\nlet serverInterval = setInterval(onServerUpdate, 500);\n\nfunction onServerUpdate() {\n  auctionState.currentDateTime = new Date();\n\n  if (auctionState.finished) {\n    logger.info(\"Auction finished.\");\n    server.emit(\"status-message\", {\n      message: `Аукцион окончен.`\n    });\n    clearInterval(serverInterval);\n    serverInterval = null;\n    return;\n  }\n\n  if (auctionState.started) {\n    if (auctionState.currentStage === Stage.PAUSE) {\n      if (auctionState.currentDateTime.getTime() >= auctionState.currentEndDateTime.getTime()) {\n        auctionState.currentStage = Stage.WAIT_FOR_BET;\n        auctionState.currentEndDateTime = new Date(auctionState.currentDateTime.getTime() + auctionState.settings.auctionTimeout * 1000 + 500);\n        logger.info(`The beginning of accepting bets on the painting '${auctionState.currentPainting.title}'.`);\n        server.emit(\"status-message\", {\n          message: `Начало приема ставок по картине '${auctionState.currentPainting.title}'.`\n        });\n      }\n    } else if (auctionState.currentStage === Stage.WAIT_FOR_BET) {\n      if (auctionState.currentDateTime.getTime() >= auctionState.currentEndDateTime.getTime()) {\n        if (auctionState.currentBuyer) {\n          auctionState.currentBuyer.balance -= auctionState.currentPrice;\n          auctionState.currentPainting.holder = auctionState.currentBuyer.name;\n          auctionState.currentPainting.price = auctionState.currentPrice;\n          logger.info(`The acceptance of bets is completed. Painting '${auctionState.currentPainting.title}' was sold to user '${auctionState.currentBuyer.name}'.`);\n          server.emit(\"painting-sold\");\n          server.emit(\"status-message\", {\n            message: `Прием ставок завершен. Картина '${auctionState.currentPainting.title}' продана пользователю '${auctionState.currentBuyer.name}'.`\n          });\n        } else {\n          logger.info(`The acceptance of bets is completed. Painting '${auctionState.currentPainting.title}' was not sold.`);\n          server.emit(\"status-message\", {\n            message: `Прием ставок завершен. Картина '${auctionState.currentPainting.title}' не была продана.`\n          });\n        }\n\n        auctionState.paintings.splice(0, 1);\n        auctionState.currentPainting = null;\n        auctionState.currentPrice = null;\n        auctionState.currentBuyer = null;\n        auctionState.currentEndDateTime = null;\n        auctionState.currentStage = null;\n        auctionState.currentDateTime = null;\n\n        if (auctionState.paintings.length === 0) {\n          auctionState.finished = true;\n        }\n      }\n    } else {\n      auctionState.currentPainting = auctionState.paintings[0];\n      auctionState.currentPrice = auctionState.currentPainting.startPrice;\n      auctionState.currentEndDateTime = new Date(auctionState.currentDateTime.getTime() + auctionState.settings.pauseTimeout * 1000 + 500);\n      auctionState.currentStage = Stage.PAUSE;\n      logger.info(`The beginning of trading on the painting '${auctionState.currentPainting.title}'.`);\n      server.emit(\"status-message\", {\n        message: `Начало торгов по картине '${auctionState.currentPainting.title}'.`\n      });\n    }\n\n    server.emit(\"auction-state\", auctionState);\n    return;\n  }\n\n  if (auctionState.currentDateTime.getTime() >= auctionState.startDateTime.getTime()) {\n    auctionState.started = true;\n\n    if (auctionState.paintings.length === 0) {\n      auctionState.finished = true;\n    }\n\n    logger.info(\"Auction started.\");\n    server.emit(\"status-message\", {\n      message: `Аукцион начался.`\n    });\n  }\n}\n\nserver.on(\"connection\", socket => {\n  let userName = null;\n  logger.info(\"New connection established.\");\n  socket.on(\"user-connection\", data => {\n    if (data) {\n      logger.info(`User '${data.name}' connected.`);\n      server.emit(\"status-message\", {\n        message: `Пользователь '${data.name}' присоеденился.`\n      });\n      userName = data.name;\n    }\n  });\n  socket.on(\"get-auction-state\", () => {\n    socket.emit(\"auction-state\", auctionState);\n  });\n  socket.on(\"bet\", data => {\n    let bet = data.bet;\n    let user = null;\n\n    if (data.user) {\n      user = storage.users.find(user => user.id === data.user.id);\n    }\n\n    if (user && bet) {\n      if (auctionState.currentStage !== Stage.WAIT_FOR_BET) {\n        socket.emit(\"bet-status\", {\n          success: false,\n          message: \"На данный момент предложения о новых ценах не принимаются.\"\n        });\n        return;\n      }\n\n      if (auctionState.currentPrice + auctionState.currentPainting.minimalPriceStep <= bet && auctionState.currentPrice + auctionState.currentPainting.maximumPriceStep >= bet) {\n        if (bet <= user.balance) {\n          auctionState.currentPrice = Number(bet);\n          auctionState.currentBuyer = user;\n          auctionState.currentEndDateTime = new Date(new Date().getTime() + auctionState.settings.betTimeout * 1000 + 500);\n          logger.info(`User '${user.name}' placed a bet of '${bet}'.`);\n          socket.emit(\"bet-status\", {\n            success: true,\n            message: \"Новая цена успешно предложена.\"\n          });\n          server.emit(\"status-message\", {\n            message: `Пользователь '${user.name}' сделал ставку в размере '${bet}'.`\n          });\n        } else {\n          socket.emit(\"bet-status\", {\n            success: false,\n            message: \"На балансе не хватает средств.\"\n          });\n        }\n      } else {\n        if (auctionState.currentPrice + auctionState.currentPainting.minimalPriceStep > bet) {\n          socket.emit(\"bet-status\", {\n            success: false,\n            message: \"Новая цена меньше минимально возможного значения.\"\n          });\n        } else {\n          socket.emit(\"bet-status\", {\n            success: false,\n            message: \"Новая цена больше максимально возможного значения.\"\n          });\n        }\n      }\n    }\n  });\n  socket.on(\"disconnect\", () => {\n    if (userName) {\n      logger.info(`User '${userName}' disconnected.`);\n      server.emit(\"status-message\", {\n        message: `Пользователь '${userName}' вышел.`\n      });\n    }\n  });\n});\nmodule.exports = server;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/socket-server/index.js?");

/***/ }),

/***/ "./src/storage/index.js":
/*!******************************!*\
  !*** ./src/storage/index.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const settings = __webpack_require__(/*! ./settings.json */ \"./src/storage/settings.json\");\n\nconst paintings = __webpack_require__(/*! @rkolovanov/web-auction-paintings/storage/paintings.json */ \"@rkolovanov/web-auction-paintings/storage/paintings.json\");\n\nconst users = __webpack_require__(/*! @rkolovanov/web-auction-paintings/storage/users.json */ \"@rkolovanov/web-auction-paintings/storage/users.json\");\n\nconst auctionSettings = __webpack_require__(/*! @rkolovanov/web-auction-paintings/storage/auction-settings.json */ \"@rkolovanov/web-auction-paintings/storage/auction-settings.json\");\n\nconst storage = {\n  settings,\n  auctionSettings,\n  paintings,\n  users\n};\nmodule.exports = storage;\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/storage/index.js?");

/***/ }),

/***/ "@rkolovanov/web-auction-paintings/authentication":
/*!*******************************************************************!*\
  !*** external "@rkolovanov/web-auction-paintings/authentication" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@rkolovanov/web-auction-paintings/authentication");

/***/ }),

/***/ "@rkolovanov/web-auction-paintings/storage/auction-settings.json":
/*!**********************************************************************************!*\
  !*** external "@rkolovanov/web-auction-paintings/storage/auction-settings.json" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@rkolovanov/web-auction-paintings/storage/auction-settings.json");

/***/ }),

/***/ "@rkolovanov/web-auction-paintings/storage/paintings.json":
/*!***************************************************************************!*\
  !*** external "@rkolovanov/web-auction-paintings/storage/paintings.json" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@rkolovanov/web-auction-paintings/storage/paintings.json");

/***/ }),

/***/ "@rkolovanov/web-auction-paintings/storage/users.json":
/*!***********************************************************************!*\
  !*** external "@rkolovanov/web-auction-paintings/storage/users.json" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@rkolovanov/web-auction-paintings/storage/users.json");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-session");

/***/ }),

/***/ "express-winston":
/*!**********************************!*\
  !*** external "express-winston" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-winston");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("passport");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ }),

/***/ "winston-rollbar":
/*!**********************************!*\
  !*** external "winston-rollbar" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("winston-rollbar");

/***/ }),

/***/ "./src/storage/settings.json":
/*!***********************************!*\
  !*** ./src/storage/settings.json ***!
  \***********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"listenIP\":\"localhost\",\"listenHttpPort\":8070,\"listenSocketPort\":8090,\"session_secret\":\"6e450eb6-a5b9-4305-bf05-377b825a5f73\",\"bodyParserJsonParameters\":{\"limit\":\"10mb\"},\"bodyParserUrlencodedParameters\":{\"limit\":\"10mb\",\"extended\":true,\"parameterLimit\":50000}}');\n\n//# sourceURL=webpack://@rkolovanov/web-auction-paintings-participation/./src/storage/settings.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;