const express = require('express')
const connectDB = require('./config/dbConnect');
const app = express()
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const path = require('path')

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, './client/build')))

//connecting database
connectDB();

//routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Hello...")
})

//rest API
app.use('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})