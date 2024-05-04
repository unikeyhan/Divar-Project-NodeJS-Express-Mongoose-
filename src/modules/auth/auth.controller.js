const { SendOTPSuccessfully, LoginSuccessfully } = require('./auth.messages');
const NodeEnv = require('../../common/constant/env.enum');
const authService = require('./auth.service');
const autoBind = require('auto-bind');

class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }
    async sendOTP(req, res, next) {
        try {
            const { mobile } = req.body;
            await this.#service.sendOTP(mobile);
            return res.json({
                message: SendOTPSuccessfully,
            });
        } catch (error) {
            next(error);
        }
    }
    async checkOTP(req, res, next) {
        try {
            const { mobile, code } = req.body;
            const token = await this.#service.checkOTP(mobile, code);
            return res
                .cookie('access_token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === NodeEnv.Production,
                })
                .status(200)
                .json({
                    message: LoginSuccessfully,
                    token,
                });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
