const OptionModel = require('./option.model');
const CategoryModel = require('../category/category.model');
const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { NotFound, AlreadyExist } = require('./option.message');
const { default: slugify } = require('slugify');

class OptionService {
    #model;
    #categoryModel;
    constructor() {
        autoBind(this);
        this.#model = OptionModel;
        this.#categoryModel = CategoryModel;
    }

    async create(opitonDto) {
        const category = await this.checkCategoryExistById(opitonDto.category);
        opitonDto.category = category._id;
        opitonDto.key = slugify(opitonDto.key, { trim: true, replacement: '_', lower: true });
        await this.alreadyExistByCategoryAndKey(category._id, opitonDto.key);
        if (opitonDto?.enum && typeof opitonDto.enum === 'string') {
            opitonDto.enum = opitonDto.enum.split(',');
        } else if (!Array.isArray(opitonDto.enum)) opitonDto.enum = [];
        const option = await this.#model.create(opitonDto);
        return option;
    }

    async checkCategoryExistById(id) {
        const category = await this.#categoryModel.findById(id);
        if (!category) throw new createHttpError.NotFound(NotFound);
        return category;
    }

    async alreadyExistByCategoryAndKey(category, key) {
        const option = await this.#model.findOne({ category, key });
        if (option) throw new createHttpError.Conflict(AlreadyExist);
        return null;
    }

    async find() {}
}

module.exports = new OptionService();
