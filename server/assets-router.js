//Import the Express framework
const express = require("express");
//Create Express router
//Router is used to define a set of routes that can be mounted on an Express application
const router = express.Router();
//Define regular expression that match paths ending w svg, png, jpg, jpeg
//This is used to identify image requests
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; 
//Define regular expression that match paths ending w mp4, ogv
//This is used to identify video requests
const videoRegex = /\/.+\.(mp4|ogv)$/;
//Handling GET HTTP request that match imageRegex
router.get(imageRegex, (req, res)=>{
    //Extract the path from the request
    const filePath = req.path;
    //Send a redirect response with a status code 303
    //Change the base path of the requested file and redirects the request to the new location
    res.redirect(303, `http://localhost:3000/src${filePath}`);
});
//Handling GET HTTP request the match videoRegex
router.get(videoRegex, (req, res) =>{
    //Extract the path from the request
    const filePath = req.path;
    //Send a redirect response with a status 303
    //Change the base path of the requested file and redirects the request to the new location
    res.redirect(303, `http://localhost:3000/src${filePath}`);
});
//Export the router object so that it can be used by other parts of the application
module.exports = router;