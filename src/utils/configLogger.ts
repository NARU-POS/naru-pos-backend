import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = "server_logs";

const logFormat = printf((info) => {
    return `${info.timestamp} [ ${info.level} ] : ${info.message}`;
});

const loggerLevelConfig = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        data: 4,
        debug: 5,
    },
    colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        http: "magenta",
        data: "gray",
        debug: "blue",
    },
};

winston.addColors(loggerLevelConfig.colors);

export const logger = winston.createLogger({
    levels: loggerLevelConfig.levels,
    level: "data",
    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        logFormat,
    ),
    transports: [
        new winstonDaily({
            level: "data",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/data",
            filename: `%DATE%.data.log`,
            maxFiles: 7,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/info",
            filename: `%DATE%.info.log`,
            maxFiles: 15,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: "http",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/http",
            filename: `%DATE%.http.log`,
            maxFiles: 15,
            zippedArchive: true,
        }),
        new winstonDaily({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir + "/error",
            filename: `%DATE%.error.log`,
            maxFiles: 15,
            zippedArchive: true,
        }),
    ],
});

export const stream = {
    write: (message: any) => {
        logger.http(message);
    },
};

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            level: "debug",
            format: combine(colorize({ all: true }), logFormat),
        }),
    );
}
