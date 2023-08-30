require('dotenv').config()
const PORT = process.env.PORT || 3000;
const express = require('express');  // Import express.js
const app = express();  // The app object conventionally denotes the Express application. Create it by
                        // calling the top-level express() function exported by the Express module.

const path = require('path');

const http = require('http').Server(app);
var fs = require('fs');
const formidable = require('formidable');
var cors = require('cors')
app.use(cors());
app.use (express.json());   // Mounts the specified middleware function at the
                            // specified path: the middleware function is executed when the base of the
                            // requested path matches path. In this case we are using middleware to parse
                            // JSON data

app.use('/images',express.static('userimages'));
// app.use(express.static(path.join(__dirname, '../dist/week5tut/'))); // Serve
// static content for the app from the “public”

//Require socket.io
const io = require('socket.io')(http,{
    cors:{
        origin:"http://localhost:4200",
        methods:["GET","POST"],
    }
});
const sockets = require('./socket.js');
//POST Route for uploading images.
require('./routes/api-uploads.js')(app,formidable,fs,path);

//POST route for updating user profile information
require('./routes/api-update-users.js')(app,formidable,fs,path);

// POST Route for checking user credentials
require('./routes/api-login.js')(app,path,fs);

// GET Route for getting all car data
require('./routes/api-data-cars.js')(app,fs);

// Start the server listening on port 3000. Output message to console once server has started.(diagnostic only)
require('./listen.js')(http,PORT);
sockets.connect(io, PORT);
