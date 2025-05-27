const userModel = require('../models/userModel')

async function getUserProfileController(req, res) {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password");

        if(!user) {
            return res.status(404),json({
                success: false,
                error: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            response: user
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
};

async function updateUserProfileController(req, res) {
    try {
        const userId = req.user.id;
        const data = req.body;
        
        await userModel.findByIdAndUpdate(userId, data, {new: true});

        res.status(200).json({
            success: true,
            message: 'Profile updated'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        })
    }
};

function getOrdersController(req, res) {};

function getWishListController(req, res) {};

module.exports = {
    getUserProfileController,
    updateUserProfileController,
    getOrdersController,
    getWishListController
}