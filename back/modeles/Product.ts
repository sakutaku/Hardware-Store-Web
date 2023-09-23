import mongoose from "mongoose";
import User from "./User";
import Category from "./Category";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: [1, 'Too cheap'],
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await Category.findById(value),
            message: 'Category does not exist!',
        },
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: mongoose.Types.ObjectId) => await User.findById(value),
            message: 'User does not exist!',
        },
    },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;