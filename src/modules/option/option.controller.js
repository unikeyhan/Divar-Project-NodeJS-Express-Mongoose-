const autoBind = require('auto-bind');
const optionService = require('./option.service');
const httpCodes = require('http-codes');
const { Created } = require('./option.message');

class OptionController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = optionService;
    }

    async create(req, res, next) {
        try {
            const { title, key, type, enum: list, guide, category } = req.body;
            await this.#service.create({ title, key, type, enum: list, guide, category });
            return res.status(httpCodes.CREATED).json({
                message: Created,
            });
        } catch (err) {
            next(err);
        }
    }
    async findByCategory(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
    async findById(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
    async find(req, res, next) {
        try {
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new OptionController();
