const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

async function createProductController(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if(user.role != "admin") {
            return res.status(401).json({
                success: false,
                error: "Unauthorized access"
            })
        }
            const {name, description, images, category, brand, price, stock, rating, numReviews} = req.body;
            
            if(!name || !description || !images || !category || !brand || !price) {
                return res.status(400).json({
                    success: false,
                    error: 'These fields are required'
                })
            }
    
            const product = await productModel.create({name, description, images, category, brand, price, stock, rating, numReviews});

            res.status(200).json({
                success: true,
                response: product
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            })
        }
};

async function updateProductController(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if(user.role != "admin") {
            return res.status(401).json({
                success: false,
                error: "Unauthorized access"
            })
        }
        const productId = req.params.id;
        const check = await productModel.findById(productId);
        if(!check) {
            return res.status(403).json({
                success: false,
                error: `Product doesn't exist`
            })
        }

        const data = req.body;
        const product = await productModel.findByIdAndUpdate(productId, data, {new: true})

        res.status(200).json({
            success: true,
            response: product
        })
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function deleteProductController(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if(user.role != "admin") {
            return res.status(401).json({
                success: false,
                error: "Unauthorized access"
            })
        }
        const productId = req.params.id;
        const check = await productModel.findById(productId);
        if(!check) {
            return res.status(403).json({
                success: false,
                error: `Product doesn't exist`
            })
        }

        const product = await productModel.findByIdAndDelete(productId)

        res.status(200).json({
            success: true,
            message: 'Product deleted'
        })
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

module.exports = {
    createProductController,
    updateProductController,
    deleteProductController
}