import winston from "winston";
import { format } from "winston";
// import { ENVIRONMENT } from "./secrets";

const myFormat = format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  });

const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        myFormat
    ),
    transports: [
        new (winston.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston.transports.File)({ filename: "debug.log", level: "debug"})
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
