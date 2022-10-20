"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myPassport = exports.jwtStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const server_1 = require("../server");
const passport_jwt_1 = __importStar(require("passport-jwt"));
require('dotenv').config();
const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
exports.jwtStrategy = new passport_jwt_1.default.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.JWT_SECRET}`,
}, (jwtPayload, done) => {
    const user = jwtPayload;
    console.log('User from strategy', user);
    done(null, user);
});
function getDate() {
    const dateTime = new Date();
    // get current date
    // adjust 0 before single digit date
    const date = ('0' + dateTime.getDate()).slice(-2);
    // get current month
    const month = ('0' + (dateTime.getMonth() + 1)).slice(-2);
    // get current year
    const year = dateTime.getFullYear();
    // get current hours
    const hours = dateTime.getHours();
    // get current minutes
    const minutes = dateTime.getMinutes();
    // get current seconds
    const seconds = dateTime.getSeconds();
    // prints date in YYYY-MM-DD format
    console.log(year + '-' + month + '-' + date);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    return (year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        seconds);
}
exports.myPassport = passport_1.default.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5001/api/v1/users/auth/google-callback',
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, profile, cb) {
    console.log(profile);
    const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.email,
        avatar: profile.picture,
    };
    console.log(profile);
    console.log(user);
    if (profile.verified) {
        server_1.client.query('SELECT * FROM federated_credentials WHERE email = $1 ', [user.email], function (err, cred) {
            if (err) {
                cb(null, err);
            }
            if (cred) {
                if (cred.rowCount == 0) {
                    server_1.client.query('INSERT INTO  federated_credentials(name,email, profile_id, avatar) VALUES($1,$2,$3,$4) ', [user.name, user.email, user.id, user.avatar], function (err, res) {
                        if (err) {
                            cb(null, err);
                        }
                    });
                }
                else if (cred.rowCount == 1) {
                    server_1.client.query('Update federated_credentials SET avatar=$1 where email=$2 ', [user.avatar, user.email], function (err, res) {
                        if (err) {
                            cb(null, err);
                        }
                    });
                }
            }
        });
        if (user.id != null) {
            //here to check the user table
            server_1.client.query('Select * FROM  public."users" where email=$1', [user.email], function (err, res) {
                if (err) {
                    console.log(null, err);
                }
                if (res) {
                    if (res.rowCount > 0) {
                        return;
                    }
                    if (res.rowCount == 0) {
                        //user does not exists
                        console.log(user);
                        const [firstname, lastname] = user.name.split(' ');
                        console.log(firstname);
                        console.log(lastname);
                        server_1.client.query('INSERT INTO  public."users"(firstname,lastname,email,admin,lastlogin,passwordhash) VALUES($1,$2,$3,$4,$5,$6) ', [firstname, lastname, user.email, 0, getDate(), null], function (err, res) {
                            console.log(err);
                            if (err) {
                                cb(null, err);
                            }
                            if (res) {
                                console.log(res);
                            }
                        });
                    }
                }
            });
            cb(null, user);
        }
        else {
            cb(null, new Error('Something wrong'));
        }
    }
    else {
        cb(null, new Error('Something wrong'));
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=passport.js.map