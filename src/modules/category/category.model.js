const { Schema, Types, model } = require('mongoose');

const CategorySchmea = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, index: true },
        icon: { type: String, required: true },
        parent: { type: Types.ObjectId, ref: 'category', required: false },
        parents: { type: [Types.ObjectId], ref: 'category', required: false, default: [] },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true } }
);

CategorySchmea.virtual('children', {
    ref: 'category',
    localField: '_id',
    foreignField: 'parent',
});

function autoPopulate(next) {
    this.populate([{ path: 'children' }]);
    next();
}
CategorySchmea.pre('find', autoPopulate).pre('findOne', autoPopulate);

const CategoryModel = model('category', CategorySchmea);

module.exports = CategoryModel;
