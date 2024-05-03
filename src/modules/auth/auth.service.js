const autoBind = require('auto-bind');
const UserModel = require('../users/user.model');
const createHttpError = require('http-errors');
const { NotFound, OtpCodeNotExpired } = require('./auth.messages');
const { randomInt } = require('crypto');

class AuthService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = UserModel;
    }
    async sendOTP(mobile) {
        const user = await this.#model.findOne({ mobile });
        const now = new Date().getTime();
        const otp = {
            code: randomInt(10000, 99999),
            expiresIn: now + 1000 * 60 * 2,
        };
        // const user = await this.checkExistByMobile(mobile);
        if (!user) {
            const newUser = await this.#model.create({ mobile, otp });
            return newUser;
        }
        if (user.otp && user.otp.expiresIn > now) {
            throw new createHttpError.BadRequest(OtpCodeNotExpired);
        }
        user.otp = otp;
        await user.save();
        return user;
    }
    async checkOTP(mobile, code) {}
    async checkExistByMobile(mobile, code) {
        const user = await this.#model.findOne({ mobile });
        if (!user) throw new createHttpError.NotFound(NotFound);
        return user;
    }
}

module.exports = new AuthService();
