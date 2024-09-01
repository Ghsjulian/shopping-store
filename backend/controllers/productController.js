const Product = require("../models/product");
const dotenv = require("dotenv").config("../.env");
const fs = require("fs").promises;
const host = process.env.HOST;
/*------------------------------------------*/
// Creating Product Class For Maintaing Products
class productController {
    static async deleteFile(filepath) {
        try {
            await fs.unlink(filepath);
            return true;
        } catch (err) {
            return false;
        }
    }
    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            if (products) {
                res.json(products);
            } else {
                throw new Error("No Product Found !");
            }
        } catch (error) {
            res.status(404).json({
                code: 404,
                type: false,
                status: "failed",
                error: error.message
            });
        }
    }
    async getProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await Product.findOne({ _id: id });
            if (product) {
                res.json(product);
            } else {
                throw new Error("No Product Found !");
            }
        } catch (error) {
            res.status(404).json({
                code: 404,
                type: false,
                status: "failed",
                error: error.message
            });
        }
    }
    async addProduct(req, res) {
        const data = JSON.parse(req.body.data);
        const productImg = req.file.filename;
        const product_obj = data.product_desc;
        const category = data.product_category;
        const title = data.product_title;
        if (!data || !productImg) {
            return res.status(400).json({
                code: 403,
                type: false,
                status: "failed",
                error: "All Fields Are Required"
            });
        }
        if (data && productImg) {
            try {
                const newProduct = new Product({
                    product_title: title,
                    product_img: host + "/products/" + productImg,
                    product_desc: product_obj,
                    product_category: category
                });
                const save = await newProduct.save();
                if (save) {
                    res.status(201).json({
                        code: 201,
                        type: true,
                        status: "success",
                        success: "Product Added Successfully"
                    });
                } else {
                    throw new Error("Error Adding Product!");
                }
            } catch (error) {
                await productController.deleteFile("./public/products/" + productImg);
                res.status(403).json({
                    code: 403,
                    type: false,
                    status: "failed",
                    error: error.message
                });
            }
        }
    }
    async updateProduct(req, res) {
        const id = req.params.id;
        const data = JSON.parse(req.body.data);
        const productImg = req.file.filename;
        console.log(productImg);
        console.log(id);
        await productController.deleteFile("./public/products/" + productImg);
        res.json({ data });
        // const product_obj = data.product_desc;
        // const category = data.product_category;
        // const title = data.product_title;
    }
}

/*------------------------------------------*/
// Exported The Product Class Here...
module.exports = new productController();
