const https = require("https");
const http = require("http");
const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();


let PORT = 3000;

//app.use(bodyParser.json({ extended: true }));

app.use(express.static("static"));

app.get("/", (req, res) => {
    console.log("GET");
    res.sendFile("C:\\Users\\A104356668\\Desktop\\repos\\mask-detector\\index.html")
    
})

app.listen(PORT, () => {
    console.log("Started server at http://localhost:" + PORT.toString());
});