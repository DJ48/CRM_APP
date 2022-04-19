const express = require("express");
const serverConfig = require("./configs/server.config");
const dbConfig = require("./configs/db.config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**
 * Setup the mongodb connection and create an ADMIN user
 */
mongoose.connect(dbConfig.DB_URL, ()=>{
    console.log("MongoDB Connected");
    init();
})

async function init(){
    var user = await User.findOne({ userId: "admin" });

    if (user) {
        return;
    } else {

        //Create the admin user

        const user = await User.create({
            name: "Vish",
            userId: "admin",
            email: "kankvish7777@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome00123", 8)
        });
        console.log("admin user is created");

    }
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

//Start The server
app.listen(serverConfig.PORT,()=>{
    console.log("Server Started on the port: "+ serverConfig.PORT);
})