const createHttpError = require('http-errors');
const AuthorizationMessages = require('../messages/auth.messages');
const UserModel = require('../../modules/users/user.model');
const jwt = require('jsonwebtoken');
const CookiesName = require('../constant/cookies.enum');
require('dotenv').config();

const Authorization = async (req, res, next) => {
    try {
        console.log(1);
        const token = req?.cookies?.[CookiesName.AccessToken];
        if (!token) throw new createHttpError.Unauthorized(AuthorizationMessages.Login);
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (typeof data === 'object' && 'id' in data) {
            const user = await UserModel.findById(data.id, { otp: 0, accessToken: 0, __v: 0, updatedAt: 0, verifiedMobile: 0 }).lean();
            if (!user) throw new createHttpError.Unauthorized(AuthorizationMessages.NotFoundAccount);
            req.user = user;
            return next();
        }
        throw new createHttpError.Unauthorized(AuthorizationMessages.InvalidToken);
    } catch (err) {
        next(err);
    }
};

module.exports = Authorization;
