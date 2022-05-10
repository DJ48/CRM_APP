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
        reporter : req.userId
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

/**
 *  API to fetch all the tickets
 *  Allow the user to filter based on
 *  Depending on the user I need to return differnt list of tickets :
 * 
 *  1. ADMIN - Return all tickets
 *  2. ENGINEER - All the tickets, either created or assigned to him/her
 *  3. CUSTOMER - All the tickets created by him
 */

exports.getAllTickets = async(req,res) =>{

    const statusReq = req.query.status;
    const userType = req.userType;
    let queryObj = {};

    if(statusReq){
        queryObj.status = statusReq;
    }
    if(userType == constants.userTypes.customer){
        queryObj.reporter = req.userId;
    }else if(userType == constants.userTypes.engineer){
        queryObj.$or= [ { reporter: req.userId }, { assignee: req.userId } ] 
    }
    
    try{
        const tickets = await Ticket.find(queryObj);
        if(tickets.length == 0){
            if(statusReq){
                return res.status(201).send({
                    message : "There is no "+statusReq+" ticket."
                });
            }
            else{
                return res.status(201).send({
                    message : "You haven't created any ticket."
                });
            }
        }
        return res.status(201).send(objectConverter.ticketListResponse(tickets));

    }catch(err){
        console.error("Error while fetching all tickets: ", err.message);
        return res.status(500).send({
            message : "some internal error while fecthing all tickets"
        });
    }
    
}

/**
 *  Controller to fetch ticket based on id
 */
exports.getOneTicket = async(req,res) => {
    
    try {
        const ticket = await Ticket.findOne({
            _id : req.params.id
        });
        return res.status(201).send(objectConverter.ticketResponse(ticket));
    } catch (err) {
        console.error("Error while fetching ticket by ID: ", err.message);
        return res.status(500).send({
            message : "some internal error while fecthing ticket by ID"
        });
    }
}

/**
 *  Controller to update the ticket
 *  TODO : 
 *  1. Assignee Engineer should also be able to update the ticket
 *  
 */

exports.updateTicket = async(req,res)=>{

    try {
        // Check if the ticket exists
        const ticket = await Ticket.findOne({
            _id : req.params.id
        });
        
        if(ticket == null){
            return res.status(200).send({
                message : "Ticket doesn't exist"
            })
        }

        /**
         *  Only the ticket requestor, Admin & Assigned Engineer should be allowed to update
         *  
         */
        if(ticket.reporter != req.userId && ticket.assignee != req.userId && req.userType != constants.userTypes.admin){
            return res.status(400).send({
                message : "You are not authorized to update the ticket"
            })
        }

        // Update the attributes of the saved ticket
        ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
        ticket.description = req.body.description != undefined ? req.body.description : ticket.description;
        ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
        ticket.status = req.body.status != undefined ? req.body.status : ticket.status;

        // saved the changed ticket
        const updatedTicket = await ticket.save();
        
        // Return the updated ticket

        return res.status(200).send(objectConverter.ticketResponse(updatedTicket));
    } catch (err) {
        console.error("Error while updating ticket: ", err.message);
        return res.status(500).send({
            message : "some internal error while updating ticket"
        });
    }
}
