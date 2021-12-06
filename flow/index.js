/* @flow */

const storage = require("./storage");
const logger = require("./logging");
const expressServer = require("./express-server");
const socketServer = require("./socket-server");

socketServer.listen(storage.settings.listenSocketPort);
expressServer.listen(storage.settings.listenHttpPort, storage.settings.listenIP, () => {
    let message: string = `Server started at http://${storage.settings.listenIP}:${storage.settings.listenHttpPort}`;
    logger.info(message);
});
