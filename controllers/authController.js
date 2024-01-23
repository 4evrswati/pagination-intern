const { hashPassword, comparePassword } = require("../helper/authHelper");
const jwt = require('jsonwebtoken')
const User = require("../models/authModel");
require('dotenv').config()

//register user
const registerController = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.status(400).send({message: 'Please, Provide complete details'})
        }

        const user = await User.findOne({ email })

        if(user) {
            return res.status(400).send({message: 'Email id already exist.'})
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await new User({
            name, email, password: hashedPassword
        }).save();

        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})

        return res.status(200).send({
            success: true,
            message: 'User Register Successfully',
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

//login user
const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please, Provide complete details'
            })
        }

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).send({
                success: false,
                message: 'Email id does not exists'
            })
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Password'
            })
        }

        const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})

        return res.status(200).send({
            success: true,
            message: "Login successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in LogIn',
            error
        })
    }
}

module.exports = {registerController, loginController}