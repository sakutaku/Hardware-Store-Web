import express from "express";
import Product from "../models/Product";
import auth, {IRequestWithUser} from "../midlleware/auth";
import {IProduct} from "../types";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";

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
            price: price,
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