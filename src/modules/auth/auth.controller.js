const { SendOTPSuccessfully } = require('./auth.messages');
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
            this.#service.sendOTP();
            const { mobile } = req.body;
            await this.#service.sendOTP(mobile);
            return {
                message: SendOTPSuccessfully,
            };
        } catch (error) {
            next(error);
        }
    }
    async checkOTP(req, res, next) {
        try {
            this.#service.sendOTP();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();
