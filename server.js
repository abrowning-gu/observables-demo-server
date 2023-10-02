require('dotenv').config()
const PORT = process.env.PORT || 3000;
const ANGULAR_URL = process.env.ANGULAR_URL || "http://localhost:4200";
const MONDODB_URL = process.env.MONDODB_URL || "mongodb://127.0.0.1:27017";
const express = require('express');  // Import express.js
const {MongoClient} = require('mongodb');
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

app.use('/images',express.static(path.join(__dirname, 'userimages')));
//Require socket.io
const io = require('socket.io')(http,{
    cors:{
     origin: ANGULAR_URL,
        methods:["GET","POST"],
    }
});
const sockets = require('./socket.js');
sockets.connect(io, PORT);
//mongo connection string to mongo atlas database
const uri = MONDODB_URL;

const client = new MongoClient(uri);
async function main() {
	
    try{
       
        await client.connect();
        let db = client.db("demo-app");
        console.log("DB connected");
    
        //POST Route for uploading images.
        require('./routes/api-uploads.js')(app,formidable,fs,path);

        //POST route for updating user profile information
        require('./routes/api-update-users.js')(app,db);

        // POST Route for checking user credentials
        require('./routes/api-login.js')(app,db);

        // GET Route for getting all car data
        require('./routes/api-data-cars.js')(app,db);

        // // Start the server listening on port 3000. Output message to console once server has started.(diagnostic only)
         require('./listen.js')(http,PORT);
         
    }
    catch(e){
        console.log(e);
    }
    
}main().catch(console.error);


