const axios = require('axios');
const userModel = require('./models/userModel');
const connectDB = require('./config/dbConnect')
require('dotenv').config()

const fetchDataAndSaveToDB = async () => {
    try {
      await connectDB(process.env.MONGODB_URL);
  
      const response = await axios.get('https://dummyjson.com/users');
      const apiResponse = response.data.users;
  
      // Extract relevant data from each user in the API response
      for (const user of apiResponse) {
        const { firstName, lastName, age, gender, email, phone } = user;
  
        // Create a new Person instance
        const newPerson = new userModel({
          firstName,
          lastName,
          age,
          gender,
          email,
          phone,
        });
  
        // Save the new person to the database
        await newPerson.save();
        console.log('Data saved successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  fetchDataAndSaveToDB();