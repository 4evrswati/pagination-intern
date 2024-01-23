const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {requireSignIn}