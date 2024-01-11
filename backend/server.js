const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// Define a schema for the survey data
const surveySchema = new mongoose.Schema({
    surveyData: mongoose.Schema.Types.Mixed,
});


// Specify the path to your JSON file
const filePath = 'constants.json';

// Read the JSON file
const collection = fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return "test";
  }
  try {
    // Parse the JSON data into an object
    const jsonObject = JSON.parse(data);
    // You can now work with the jsonObject as a regular JavaScript object
    console.log(jsonObject);
    return jsonObject["company"];
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return "test";
  }
});


// Create a model based on the schema
const Survey = mongoose.model('Survey', surveySchema, collection);

// Endpoint to receive survey data
app.post('/submit-survey', async (req, res) => {
    try {
        const newSurvey = new Survey({ surveyData: req.body});
        await newSurvey.save();
        res.status(200).send('Survey data saved successfully');
    } catch (error) {
        res.status(500).send('Error saving survey data');
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
