"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../controllers/user");
const userMiddlewares_1 = require("../middlewares/userMiddlewares");
const passport_2 = require("../config/passport");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/users prefix
/**
 * @openapi
 * /auth/account:
 *  get:
 *    summary: authenthicate a user with googe
 *     tags:
 *     - User
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/auth/account', passport_2.myPassport.authenticate('google', {
    scope: ['email', 'profile'],
}), user_1.sucessLogin);
/**
 * @openapi
 * /login:
 *  post:
 *    summary: verify that the logged information is correct
 *     tags:
 *     - User
 *     description: verify with google the account logged in and return sucess
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.post('/login', userMiddlewares_1.verifyGoogleUser, user_1.sucessLogin);
/**
 * @openapi
 * /login/failed:
 *  get:
 *    summary: authenthicate a user failed
 *     tags:
 *     - User
 *     description: Responds if the app is up and running
 *     responses:
 *       401:
 *         description: App is up and running
 */
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure',
    });
});
/**
 * @openapi
 * /logout:
 *  get:
 *    summary: logout and clear the cookies
 *     tags:
 *     - User
 *     description: Responds if the app is up and running
 *     responses:
 *       401:
 *         description: App is up and running
 */
router.get('/logout', (req, res) => {
    req.logOut();
    res.status(200).json({
        success: true,
        message: 'Successul logout',
    });
});
/**
 * @openapi
 * /login/success:
 *  get:
 *    summary: login sucess return the user
 *     tags:
 *     - User
 *     description: Responds if the app is up and running
 *     responses:
 *       401:
 *         description: App is up and running
 */
router.get('/login/success', (req, res, next) => {
    res.cookie('user', req.user, {});
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Successul login',
            cookies: req.sessionStore.sessions,
            user: req.user,
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: 'failed login',
        });
    }
});
// Sign JSON Web Token, expires in 60 minutes
const signToken = (res, user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.status.role,
    };
    return jsonwebtoken_1.default.sign(payload, 'JWTTOCKENSECRET', { expiresIn: 3600 }, (err, token) => {
        res.json({
            success: true,
            token: `Bearer ${token}`,
        });
    });
};
// Every path we define here will get /api/v1/users/ prefix
/**
 * @openapi
 * /api/v1/auth/google-callback:
 *  get:
 *     tags:
 *     - User
 *     description: get a authenticated user
 *     responses:
 *       200:
 *         description: return the User
 */
router.get('/auth/google-callback', passport_1.default.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/login/failed',
}), (req, res) => {
    console.log(req.user);
    signToken(res, req.user);
});
/**
 * @openapi
 * /api/v1/users/:
 *  get:
 *     summary: gets all users
 *     tags:
 *     - User
 *     description: get a all users
 *     responses:
 *       200:
 *         description: return the User
 */
router.get('/', user_1.findAll);
/**
 * @openapi
 * /api/v1/users/:{userId}:
 *  get:
 *     summary: gets all user by id
 *     parameters:
 *     - in: path
 *     name: userId
 *     schema:
 *       type: integer
 *     tags:
 *     - User
 *     description: get a certain user by Id
 *     responses:
 *       200:
 *         description: return the User
 */
router.get('/getUser/:userId', user_1.findById);
/**
 * @openapi
 * /api/v1/users/:{email}:
 *  get:
 *     summary: gets user by email
 *     parameters:
 *     - in: path
 *     name: email
 *     schema:
 *       type: integer
 *
 *     tags:
 *     - User
 *     description: get a certain user by email
 *     responses:
 *       200:
 *         description: return the User
 */
router.get('/get/:email', user_1.findByEmail);
/**
 * @openapi
 * /api/v1/users/create:
 *  post:
 *     summary: Add a new user
 *     produces: application/json,
 *     consumes: application/json,
 *     parameters:
 *        - in: body
 *     name: body,
 *     required: true,
 *     content:
 *     application/json:
 *     schema:
 *            type: object
 *            properties:
 *                   task:
 *                      type: "object"
 *     tags:
 *     - User
 *     description: creates a user
 *     responses:
 *       200:
 *         description: user created
 */
router.post('/', user_1.createUser);
/**
 * @openapi
 * /api/v1/users/delete:
 *  delete:
 *     summary: gets user by email
 *     parameters:
 *     - in: path
 *     name: userId
 *     schema:
 *       type: integer
 *     tags:
 *     - User
 *     description: deletes a User by id
 *     responses:
 *       200:
 *         description: product created
 */
router.delete('/delete/:userId', user_1.deleteUser);
/**
 * @openapi
 * /api/v1/users/update/{userId}:
 *  put:
 *     summary: updates a certain user by id
 *     parameters:
 *     - in: path
 *     name: userId
 *     schema:
 *       type: integer
 *     tags:
 *     - User
 *     description: Updates a user
 *     responses:
 *       200:
 *         description: user Updated
 */
router.put('/update/:userId', user_1.updateUser);
exports.default = router;
//# sourceMappingURL=user.js.map