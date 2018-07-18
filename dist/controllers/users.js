"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var validator_1 = __importDefault(require("validator"));
var logger_1 = __importDefault(require("../utils/logger"));
exports.add = function (req, res) {
    var unsafeUser = validateUserBody(req.body);
    if (!unsafeUser) {
        res.status(400).send();
    }
    user_1.User.create(unsafeUser).then(function (user) {
        logger_1.default.log({
            level: 'info',
            message: "added " + user + " to db"
        });
        res.status(200).json(user);
    }).catch(function (err) {
        var errMessage = '';
        var code = 400;
        if (err.code) {
            code = 409;
            errMessage = "tried adding user to db but there is alreaddy one with the same email or name";
        }
        logger_1.default.log({
            level: 'info',
            message: errMessage
        });
        res.status(code).send();
    });
};
var validateUserBody = function (body) {
    var user = body;
    if (user.email && user.name && validator_1.default.isEmail(user.email)) {
        return user;
    }
    return undefined;
};
