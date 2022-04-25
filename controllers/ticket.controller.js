/**
 * This file will have all the logic to manipulate the user resource
*/
const User = require("../models/user.model");
const constants = require("../utils/constants");
const objectConverter = require("../utils/objectConverter");
const Ticket = require("../models/ticket.model");

/**
 *  Craete a ticket
 *      v1 - ANyone should be able to create the ticket
 */

exports.createTicket = async(req,res) =>{
    //logic to create ticket
    const ticketObjToBeStoredInDB = {
        title : req.body.title,
        description : req.body.description,
        ticketPriority : req.body.ticketPriority,
    }

    /**
     *  Check if any Engineer is available
     */

    try{
        const engineer = await User.findOne({
            userType : constants.userTypes.engineer,
            userStatus : constants.userStatus.approved
        });
        if(engineer){
            ticketObjToBeStoredInDB.assignee = engineer.userId;
        }
    
        const ticket = await Ticket.create(ticketObjToBeStoredInDB);
        
        /**
         *  Ticket is created now
         *  1. We should update the customer and engineer document
         */

        /**
         *  Find out the customer
         */
        if(ticket){
            const user  =  await User.findOne({
                userId : req.userId
            })
            user.ticketsCreated.push(ticket._id);
            await user.save();

            /**
             *  Update the Engineer
             */

            engineer.ticketsAssigned.push(ticket._id);
            await engineer.save();
            return res.status(201).send(objectConverter.ticketResponse(ticket));

        }
    }
    catch(err){
        console.error("Error while creating new ticket: ", err.message);
        res.status(500).send({
            message : "some internal error while craeting a new ticket"
        });
    }

    
}