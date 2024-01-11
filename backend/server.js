const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

// Create a model based on the schema
const Survey = mongoose.model('Survey', surveySchema, "test");

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
