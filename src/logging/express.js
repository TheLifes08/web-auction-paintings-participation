const winston = require("winston");
const expressWinston = require("express-winston");

const formatter = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        formatter
    ),
    expressFormat: true,
    colorize: true
})

module.exports = logger;