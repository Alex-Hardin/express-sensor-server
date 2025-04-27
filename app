// https://medium.com/@innovativejude.tech/build-your-first-nodejs-server-c0e9568cee20

// Import express library and save as a constant
const express = require('express'); 
// Creates express application by calling express() function
const app = express();
// Listens to port 3000
const port = 3000;

/* 
app.get('/') Defines a get request for the root URL /.
(req, res) => { ... } This is a callback function that runs when someone visits /.
req = the request object (info from the client).
res = the response object (what you send back).
res.send('Hello, World!');: Sends "Hello, World!" back to the browser as a response.
*/
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

/*
app.listen(port, ...) tells Express to start listening on port 3000.
The callback function inside listen() will run after the server has successfully started.
*/
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});

// In terminal run node app.js and go to http://localhost:3000/ you will see "Hello, World!" displayed.
// In terminal press ctrl + c to be able to type again.
