// https://expressjs.com/
/*
In Node-red flow will be composed of inject->function->http request(http://localhost:3000/api/sensor_data/test_sensor)
Function:
msg.headers = { "Content-Type": "application/json" };
msg.payload = {
    payload: msg.payload,
    topic: msg.topic
};
return msg;
*/

// Import express library
const express = require('express'); 
// Create express app
const app = express();
// Listen on port 3000
const port = 3000;


// Read JSON on incoming requests
app.use(express.json());

// Temporary database for in-memory storage of sensor data
const sensorData = {};

const autoRefresh = require('./autoRefresh')(sensorData);
app.use(autoRefresh);

/*
POST route to receive sensor data from Node-RED
Example: POST to http://localhost:3000/api/sensor_data/test_sensor
*/
app.post('/api/sensor_data/:sensor_id', (req, res) => {
    const sensorId = req.params.sensor_id; // req.params is a JavaScript object that holds all the route parameters.
    const data = req.body;

    // Saves the data to the sensorData object, using the sensor ID as the key.
    sensorData[sensorId] = data;

    console.log(`Data received for sensor ${sensorId}:`, data);
    res.send(`Data received for sensor ${sensorId}`);
});

// Start the server and send a message to console
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Try viewing a sensor at: http://localhost:${port}/ui/test_sensor`);
});
