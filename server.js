const express = require("express");
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection and create an ADMIN user
 */
mongoose.connect(dbConfig.DB_URL, ()=>{
    console.log("MongoDB Connected");
})

require('./routes/auth.routes')(app);
//Start The server

app.listen(serverConfig.PORT,()=>{
    console.log("Server Started on the port: "+ serverConfig.PORT);
})