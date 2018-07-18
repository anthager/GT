"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var users = __importStar(require("./controllers/users"));
var body_parser_1 = __importDefault(require("body-parser"));
var logger_1 = __importDefault(require("./utils/logger"));
var app = express_1.default();
var db_uri = process.env.DB_URI || 'mongodb://localhost:27017/gursch';
var startMessage = process.env.STARTMESSAGE || 'connected to mongodb in dev mode..';
mongoose_1.default
    .connect(db_uri)
    .then(function () {
    logger_1.default.log({
        level: 'debug',
        message: "connected to db in " + (process.env.NODE_ENV === 'production' ? 'production' : 'development') + " mode"
    });
})
    .catch(function (err) {
    logger_1.default.log({
        level: 'error',
        message: "failed to connect to db in " + (process.env.NODE_ENV === 'production' ? 'production' : 'development') + " mode"
    });
});
app.options('*', cors_1.default());
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.status(200).json('success');
});
app.post('/user', users.add);
var PORT = process.env.PORT || 1337;
app.listen(PORT, function () {
    logger_1.default.log({
        level: 'debug',
        message: "started in " + (process.env.NODE_ENV === 'production' ? 'production' : 'development') + " mode"
    });
});
