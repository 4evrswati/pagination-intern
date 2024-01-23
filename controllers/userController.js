const User = require('../models/userModel')

const createUserController = async(req, res) => {
    try {
        const { firstName, lastName, age, gender, email, phone } = req.body;

        if(!firstName || !email) {
            return res.status(400).send({message: 'Please, Provide at least first name and email'})
        }

        const newUser = await new User({
            firstName, lastName, age, gender, email, phone
        }).save();

        return res.status(200).send({
            success: true,
            message: "User created successfully",
            // _id: newUser._id,
            // firstName: newUser.firstName,
            // lastName: newUser.lastName,
            // age: newUser.age,
            // gender: newUser.gender,
            // email: newUser.email,
            // phone: newUser.phone
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in creating user',
            error
        })
    }
}

const getAllUsers = async(req, res) => {
    try {
        await User.find()
            .sort({ updatedAt: -1 })
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({message: "Failed to get users"})
            })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in getting users",
            error
        })
    }
}

const updateUserController = async(req, res) => {
    try {
        const {firstName, lastName, age, gender, email, phone} = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            {firstName: firstName, lastName: lastName, age: age, gender: gender, email: email, phone: phone}, {new: true}
        )

        if(!updatedUser)
        {
            return res.status(400).send({message: "User not found"})
        }

        return res.status(200).send(updatedUser)

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in updating User'
        })
    }
}

const deleteUserController = async(req, res) => {
    try {

        const userId = req.params.id

        const user = await User.findById(userId)

        if(!user)
        {
            return res.status(400).send({message: "User not found"})
        }

        await User.findByIdAndDelete(req.params.id)

        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message: "Error in deleting user",
            error
        })
    }
}

const searchUserController = async(req, res) => {
    try {
        const { query } = req.query;

        console.log(req.query);

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const users = await User.find({
            $or: [
                { firstName: { $regex: new RegExp(query, 'i') } }, // Case-insensitive search for firstName
                { email: { $regex: new RegExp(query, 'i') } },     // Case-insensitive search for email
            ],
        });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users);
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: 'Error in searching users'
        })
    }
}

module.exports = {createUserController, getAllUsers, updateUserController, deleteUserController, searchUserController}