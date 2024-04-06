import winston from "winston";

const devLogger = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
    ],
});

const prodLogger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
        }),
        new winston.transports.File({
            filename:"errors.log",
            level: "error",
            format: winston.format.simple()
        }),
    ],
});

export const logger = process.env.NODE_ENV === "production" ? prodLogger : devLogger;