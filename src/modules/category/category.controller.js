const autoBind = require('auto-bind');
const categoryService = require('./category.service');
const { Created } = require('./category.message');

const HttpCodes = require('http-codes');

class CategoryController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = categoryService;
    }

    async create(req, res, next) {
        try {
            const { name, slug, icon, parent } = res.body;
            await this.#service.create({ name, slug, icon, parent });
            return res.status(HttpCodes.CREATED).json({
                message: Created,
            });
        } catch (err) {
            next(err);
        }
    }

    async find(req, res, next) {
        try {
            const categories = await this.#service.find();
            return res.json(categories);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = CategoryController();
