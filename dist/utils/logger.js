"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var winston_2 = require("winston");
// import { ENVIRONMENT } from "./secrets";
var myFormat = winston_2.format.printf(function (info) {
    return info.timestamp + " " + info.level + ": " + info.message;
});
var logger = winston_1.default.createLogger({
    format: winston_2.format.combine(winston_2.format.timestamp(), myFormat),
    transports: [
        new (winston_1.default.transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (winston_1.default.transports.File)({ filename: "debug.log", level: "debug" })
    ]
});
if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}
exports.default = logger;
