"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeUserToken = exports.authenticateUser = exports.logRequest = void 0;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport_1 = require("../config/passport");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.logRequest = (req, res, next) => {
    next();
};
exports.authenticateUser = (req, res, next) => {
    const { username, password } = req.body;
    const user = { username, password };
    passport_1.myPassport
        .authenticate('google', {
        scope: ['email', 'profile'],
    })
        .then((res) => {
        console.log('kissak');
        next(res);
    })
        .catch((err) => {
        console.log('ayrree');
        next(err);
    });
};
exports.decodeUserToken = (req, res, next) => {
    const { token } = req.body;
    const decoded = jsonwebtoken_1.default.verify(token, 'RRTOOYHOS');
    if (1 > 0) {
    }
    else {
        throw new Error('not match');
    }
    return decoded;
};
//# sourceMappingURL=authenticateUser.js.map