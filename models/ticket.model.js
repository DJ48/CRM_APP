/**
 *  This file represents the schema for the ticket resource
 */

const mongoose = require("mongoose");
const constants = require("../utils/constants");

const ticketSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    ticketPriority : {
        type : Number,
        required : true,
        default : constants.ticketPriority.four //Possible values : 1/2/3/4
    },
    status : {
        type : String,
        required : true,
        default : constants.ticketStatus.open
    },
    reporter : {
        type : String
    },
    assignee : {
        type : String
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
        default : ()=>{
            return Date.now();
        }
    }
})

module.exports = mongoose.model("Ticket", ticketSchema);