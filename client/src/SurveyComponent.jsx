import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./json";

function SurveyComponent() {
    const survey = new Model(json);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        const surveyData = sender.data;
        submitSurveyResults(surveyData);
    });
    survey.data = {
        "nps-score": 9,
        "promoter-features": [
            "performance",
            "ui"
        ]
    };
    return (<Survey model={survey} />);
}

// Function to submit survey results to the backend
function submitSurveyResults(surveyData) {
    fetch('http://172.28.176.1:3001/submit-survey', {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(surveyData, null, 3),
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default SurveyComponent;