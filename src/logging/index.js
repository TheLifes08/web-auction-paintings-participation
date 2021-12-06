const winston = require("winston");
const RollbarTransport = require("winston-rollbar").Rollbar;

const formatter = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        formatter
    ),
    transports: [
        new RollbarTransport({
            rollbarAccessToken: "bb4e710bba194234855746d0783cabf7",
            level: "info",
            rollbarConfig: {
                environment: "development"
            },
            silent: true
        }),
        new winston.transports.Console(),
        new winston.transports.File({ filename: '../log/combined.log' })
    ]
});

module.exports = logger;