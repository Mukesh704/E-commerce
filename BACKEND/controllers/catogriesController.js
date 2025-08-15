const categoryModel = require('../models/categoryModel')

async function allCategoriesController(req, res) {
    try {
        const response = await categoryModel.find();

        res.status(200).json({
            success: true,
            response: response
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function addCategoriesController(req, res) {
    try {
        const {name, description} = req.body;
        const check = await categoryModel.findOne({name: name});

        if(check) {
            return res.status(400).json({
                success: false,
                error: 'Category already exists'
            })
        }

        const newCategory = await categoryModel.create({name,description});

        res.status(200).json({
            success: true,
            response: newCategory
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function categoryDisplay(req, res) {
    try {
        const category1 = await categoryModel.findById('689d82e1fa4638bb22d89935');
        const category2 = await categoryModel.findById('689d8120fa4638bb22d898f9');
        const category3 = await categoryModel.findById('689d816cfa4638bb22d89908');
        const category4 = await categoryModel.findById('689d8160fa4638bb22d89905');
        const category5 = await categoryModel.findById('689d81c3fa4638bb22d89920');

        res.status(200).json({
            success: true,
            category1,
            category2,
            category3,
            category4,
            category5
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

module.exports = {
    allCategoriesController,
    addCategoriesController,
    categoryDisplay,
}