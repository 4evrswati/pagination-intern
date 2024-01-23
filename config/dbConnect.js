const mongoose = require('mongoose')

const connectDB = () => {
    return (
        mongoose.connect(process.env.MONGODB_URL).then((x) => {
            console.log('Database connected successfully');
        }).catch((e) => {
            console.log('Database not connected');
        })
    )
}

module.exports = connectDB