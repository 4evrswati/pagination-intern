const bcrypt = require('bcrypt')

// Function to Hashed Password
const hashPassword = async(password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

// Function to Compare Password
const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {hashPassword, comparePassword}