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

    async find() {
        const options = await this.#model.find({}, { __v: 0 }, { sort: { _id: -1 } }).populate([{ path: 'category', select: ['name', 'slug'] }]);
        return options;
    }

    async findByCategoryId(category) {
        return await this.#model.find({ category }, { __v: 0 }).populate([{ path: 'category', select: { name: 1, slug: 1 } }]);
    }

    async findByCategorySlug(slug) {
        return await this.#model.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $unwind: '$category',
            },
            {
                $addFields: {
                    categoryName: '$category.name',
                    categoryIcon: '$category.icon',
                    categorySlug: '$category.slug',
                },
            },
            {
                $project: {
                    // 'category.parent': 0,
                    // 'category.parents': 0,
                    // 'category.__v': 0,
                    // 'category._id': 0,
                    // 'category.slug': 0,
                    category: 0,
                    __v: 0,
                },
            },
            {
                $match: {
                    categorySlug: slug,
                },
            },
        ]);
    }

    async findById(id) {
        return await this.checkOptionExistById(id);
    }

    async removeById(id) {
        await this.checkOptionExistById(id);
        return await this.#model.deleteOne({ _id: id });
    }

    async alreadyExistByCategoryAndKey(category, key) {
        const option = await this.#model.findOne({ category, key });
        if (option) throw new createHttpError.Conflict(AlreadyExist);
        return null;
    }

    async checkCategoryExistById(id) {
        const category = await this.#categoryModel.findById(id);
        if (!category) throw new createHttpError.NotFound(NotFound);
        return category;
    }

    async checkOptionExistById(id) {
        const option = await this.#model.findById(id);
        if (!option) throw new createHttpError.NotFound(NotFound);
        return option;
    }
}

module.exports = new OptionService();
