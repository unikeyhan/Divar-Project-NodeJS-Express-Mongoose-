const { SendOTPSuccessfully, LoginSuccessfully } = require('./auth.messages');
const NodeEnv = require('../../common/constant/env.enum');
const authService = require('./auth.service');
const autoBind = require('auto-bind');
const CookiesName = require('../../common/constant/cookies.enum');

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
                .cookie(CookiesName.AccessToken, token, {
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
    async logout(req, res, next) {
        console.log(CookiesName.AccessToken);
        console.log(res.clearCookie);

        try {
            return res.clearCookie(CookiesName.AccessToken).status(200).json({
                message: 'Successfully loged out',
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
