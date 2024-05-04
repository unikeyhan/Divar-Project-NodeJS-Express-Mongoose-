const userService = require('./user.service');
const autoBind = require('auto-bind');

class UserController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = userService;
    }
    async whoAmI(req, res, next) {
        console.log('t');
        try {
            const user = req.user;
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();
