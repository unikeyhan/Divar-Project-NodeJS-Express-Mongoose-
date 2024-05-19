const autoBind = require('auto-bind');
const optionService = require('./option.service');
const httpCodes = require('http-codes');
const { Created, Deleted } = require('./option.message');

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

    async findByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params;
            const options = await this.#service.findByCategoryId(categoryId);
            return res.json({
                options,
            });
        } catch (err) {
            next(err);
        }
    }
    async findByCategorySlug(req, res, next) {
        try {
            const { slug } = req.params;
            const options = await this.#service.findByCategorySlug(slug);
            return res.json({
                options,
            });
        } catch (err) {
            next(err);
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const option = await this.#service.findById(id);
            return res.json({
                option,
            });
        } catch (err) {
            next(err);
        }
    }

    async removeById(req, res, next) {
        try {
            const { id } = req.params;
            await this.#service.removeById(id);
            return res.json({
                message: Deleted,
            });
        } catch (err) {
            next(err);
        }
    }

    async find(req, res, next) {
        try {
            const options = await this.#service.find();
            return res.json(options);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new OptionController();
