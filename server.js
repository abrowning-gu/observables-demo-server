const express = require('express');  // Import express.js
const app = express();  // The app object conventionally denotes the Express application. Create it by
                        // calling the top-level express() function exported by the Express module.

const path = require('path');

const http = require('http').Server(app);

var cors = require('cors')
app.use(cors());
app.use (express.json());   // Mounts the specified middleware function at the
                            // specified path: the middleware function is executed when the base of the
                            // requested path matches path. In this case we are using middleware to parse
                            // JSON data


// app.use(express.static(path.join(__dirname, '../dist/week5tut/'))); // Serve
// static content for the app from the “public”

// Target the build version of the angular app
// created in the "dist" directory:

// Route for checking user credentials
require('./routes/api-login.js')(app,path);
// Start the server listening on port 3000. Output message to console once server has started.(diagnostic only)
require('./listen.js')(http);
