const userModel = require('../models/userModel')
const { generateToken } = require('../middlewares/authMiddleware')

async function registerController(req, res) {
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'These fields are required'
            })
        }

        const check = await userModel.findOne({email: email});

        if(check) {
            return res.status(400).json({
                success: false,
                error: 'User already exists, Please login'
            })
        }

        const user = await userModel.create({name, email, password});

        const payload = {
            id: user.id,
            role: user.role
        }

        const token = generateToken(payload);

        res.status(200).json({
            success: true,
            response: user,
            token: token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function loginController(req, res) {
     try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email: email})

        if(!user) {
            return res.status(401).json({
                status: false,
                error: 'incorrect email or password'
            })
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({
                status: false,
                error: 'incorrect email or password'
            })
        }

        const payload = {
            id: user.id,
            role: user.role
        }

        const token = generateToken(payload)

        res.status(200).json({
            success: true,
            token: token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

function forgotPasswordController(req, res) {};

async function resetPasswordController(req, res) {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        const {oldPass, newPass} = req.body;

        const isMatch = await user.comparePassword(oldPass);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                error: 'Incorrect password'
            })
        }

        const response = await userModel.findByIdAndUpdate(userId, {password: newPass}, {new: true});

        if(!response) {
            return res.status(403).json({
                success: false,
                error: 'Error changing password'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

module.exports = {
    registerController,
    loginController,
    forgotPasswordController,
    resetPasswordController
}