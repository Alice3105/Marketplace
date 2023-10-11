/*//Import the Express.js framework to build web server
const express = require("express");
//Import built-in Node.js "path" to provide utilities for 
//working with file and directory path
const path = require("path");
//Create the express application and initialize it
const app = express ();
//Import the assetsRouter module from "./server/assets-router"
const assetsRouter = require("./server/assets-router");
//Mount the middleware assetsRouter to the path "/src" to the Express application
app.use("/src", assetsRouter)

//Set up a static file serving the middleware express.static
//Serve static file when a request is made to "/" of the server
app.use("/", express.static(path.join(__dirname, "public")));
//Set up Express route to handle GET HTTP request to "/api/v1" endpoint
//Respond to request with json file
app.get("/api/v1", (req, res)=>{
    res.json({
        project: "React and Express Boilerplate",
        from: "Alice Huynh",
    });
});
//Set up catch-all route using a wildcard *
//Handle GET HTTP request by responding with index.html file
app.get("/*", (_req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
//Destructure the PORT environment variable to 5000
//Server will listen to requests coming from PORT:5000
const {PORT = 5000} = process.env;
//Start the Express server and make it listen to PORT define above
app.listen(PORT, ()=>{
    //This call back function will be executed when the server starts
    console.log();
    console.log(`App running in port ${PORT}`);
    console.log();
    console.log(`> Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
})*/


/*
This code imports configuration settings from the config.js module, 
sets up a simple route to handle requests to the root URL, 
and starts an Express server that listens on the port specified in the configuration. 
When a request is made to the root URL, the server responds with a JSON message.
*/

//Import config module to set the port number
import config from './config/config.js' 
//Import the Express app to start the server
import app from './server/express.js'
//Import the Mongoose library
import mongoose from 'mongoose' 
//Sets the Mongoose Promise implementation to use the global Promise object
mongoose.Promise = global.Promise
//Establish a connection to the MongoDB database using the mongoose.connect method
mongoose.connect(
    //config.mongoUri is the URI obtained from the config module
    config.mongoUri, 
    //These are options passed to the mongoose.connect
    //Ensure Mongoose uses the new URL parser for parsing the MongoDB connection string
    { useNewUrlParser: true,
    //Ensure Mongoose uses the 'createIndex' method for creating indexes in MongoDB
    //useCreateIndex: true, 
    //Ensure that Mongoose uses the new Server Discovery and Monitoring engine
    //for managing MongoDB server connections
    useUnifiedTopology: true } )
        .then(()=>{
            console.log("Connected to the database!");
        })
    //Set up an event in case of error during the database connection
    mongoose.connection.on('error', () => {
    //Throw an error message and display the variable config.mongoUri
    throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})


//Set up an Express route for handling HTTP GET requests to the root ("/")
//When a GET HTTP request is made to "/", a callback function sends a JSON response
app.get("/", (req, res) => {
    res.json({ message: "Welcome to DressDeck Application!" });
});
//Start the Express server and make it listen on the port specified in the config object
app.listen(config.port, (err) => { 
    //config.port is obtained from the connfig module
    //This callback function execute if there's an error when the server starts
    if (err) {
        console.log(err) 
    }
    //If server starts sucessfully, this will line logs an information message to the console
    console.info('Server started on port %s.', config.port) 
})
