/**
 * This file will hold the schema for the User Resource
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    /**
     *  name, userId, password, email, createdAt, updatedAt
     *  userType [ ADMIN | ENGINEER | CUSTOMER ]
     *  userStatus [ Pending | Approved | Rejected ]
     */

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minlength : 10,
        unique : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER"
    },
    userStatus : {
        type : String,
        required : true,
        default : "APPROVED"
    },
    //Establishing Relationship b/w user and ticket
    ticketsCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    },
    ticketsAssigned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    }

})

module.exports = mongoose.model("User", userSchema);