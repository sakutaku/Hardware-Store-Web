import express from "express";
import Product from "../models/Product";
import auth, {IRequestWithUser} from "../midlleware/auth";
import {IProduct} from "../types";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import User from "../models/User";
import Category from "../models/Category";

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
   try {
       if(req.query.category) {
           const products = await Product.find({category: req.query.category});
           return res.send(products);
       } else {
           const products = await Product.find();
           return res.send(products);
       }
   } catch (e) {
       return res.status(500).send(e);
   }
});

productsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send("Not found!");
        }

        const user = await User.findById(product.user);
        const category = await Category.findById(product.category);

        if (!user || !category) {
            return res.status(404).send("Not found!");
        }

        const newProduct = {
            _id: product._id,
            description: product.description,
            userId: user._id,
            user: user.displayName,
            title: product.title,
            image: product.image,
            category: category.title,
            phone: user.phone,
            price: product.price
        };

        return res.send(newProduct);
    } catch (e) {
        return res.status(500).send('Server error');
    }
});

productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const user = (req as IRequestWithUser).user;

        const {title, description, price, category} = req.body;

        if(!req.file) {
            return res.status(404).send("Not found!");
        }

        const newProductData: IProduct = {
            user: String(user._id),
            category: category,
            title: title,
            description: description,
            price: Number(price),
            image: req.file.filename,
        };

        const newProduct = new Product(newProductData);
        await newProduct.save();
        return res.send(newProduct);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        return next(e);
    }
});

productsRouter.delete('/:id', auth, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const userId = (req as IRequestWithUser).user._id;


        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }


        if (String(product.user) !== String(userId)) {
            return res.status(403).json({ error: 'Permission denied' });
        }


        await Product.deleteOne({ _id: product._id });

        return res.send('Product deleted!');
    } catch (error) {
        return next(error);
    }
});

export default productsRouter;