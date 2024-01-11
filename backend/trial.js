const fs = require('fs');

// Specify the path to your JSON file
const filePath = 'constants.json';

let collectionName = ''; // Initialize collectionName

// Read the JSON file synchronously and set the collectionName
try {
  const data = fs.readFileSync(filePath, 'utf8');
  const jsonObject = JSON.parse(data);
//   console.log(jsonObject);
  collectionName = jsonObject["company"];
} catch (error) {
  console.error('Error reading or parsing JSON:', error);
  collectionName = 'test'; // Set a default collection name
}

console.log(collectionName)


// // Read the JSON file
// const collection = fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading the file:', err);
//     return "test";
//   }
//   try {
//     // Parse the JSON data into an object
//     const jsonObject = JSON.parse(data);
//     // You can now work with the jsonObject as a regular JavaScript object
//     console.log(jsonObject);
//     return jsonObject["company"];
//   } catch (error) {
//     console.error('Error parsing JSON:', error);
//     return "test";
//   }
// });