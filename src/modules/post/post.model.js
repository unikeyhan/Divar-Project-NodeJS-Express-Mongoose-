const { Schema, Types, model } = require('mongoose');

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        userId: { type: Types.ObjectId, required: true },
        amount: { type: Number, required: true, default: 0 },
        content: { type: String, required: true },
        category: { type: Types.ObjectId, ref: 'Category', required: true },
        province: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        address: { type: String, required: false },
        coordinate: { type: [Number], required: true },
        images: { type: [String], required: false, default: [] },
        options: { type: Object, default: {} },
    },
    { timeStamp: true }
);

const PostModel = model('Post', PostSchema);
module.exports = PostModel;
