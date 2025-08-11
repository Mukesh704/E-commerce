const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')

async function getProducts(req, res) {
    try {
        const { category } = req.query;
        let query = {};

        if (category) {
            query.categories = category; // category is category._id
        }

        const products = await productModel.find(query).populate('categories');

        res.status(200).json({
            success: true,
            response: products,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id;

        const product = await productModel.findById(productId).populate('categories', '_id name');

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product Not Found'
            })
        }

        res.status(200).json({
            success: true,
            response: product
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function getBestSellingProducts(req, res) {
    try {
        const products = await productModel.find().sort({ itemsSold: -1 }).limit(10);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server'
        })
    }
}

async function dealOfTheDay(req, res) {
    try {
        const products = await productModel.find({ stock: { $gt: 0 } }).sort({ itemsSold: 1 }).limit(6);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: true,
            error: 'Internal Server Error'
        })
    }
}

async function newArrival(req, res) {
    try {
        const products = await productModel.find().sort({ createdAt: -1 }).limit(4);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function discountedProduct(req, res) {
    try {
        const products = await productModel.find({ stock: { $gt: 0 } }).sort({ itemsSold: 1 }).limit(6);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function comingSoon(req, res) {
    try {
        const products = await productModel.find().sort({ createdAt: -1 }).limit(4);

        res.status(200).json({
            success: true,
            response: products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function searchBar(req, res) {
    try {
        const query = req.query.query;

        if (!query || query.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }

        const matchedCategories = await categoryModel.find({
            name: { $regex: query, $options: "i" },
        }).select("_id");

        const categoryIds = matchedCategories.map(cat => cat._id);

        const products = await productModel.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { category: { $in: categoryIds } }
            ],
        }).select("_id");

        res.status(200).json({
            success: true,
            count: products.length,
            productIds: products.map(p => p._id),
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function getProductsByIds(req, res) {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of product IDs.',
            });
        }

        const products = await productModel.find({ _id: { $in: ids } });
        
        return res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        console.error('Error fetching products by IDs:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching products.',
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getBestSellingProducts,
    dealOfTheDay,
    newArrival,
    discountedProduct,
    comingSoon,
    searchBar,
    getProductsByIds,
}