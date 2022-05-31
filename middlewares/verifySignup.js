/**
 * This file will contain middleware for 
 * verifying the request body
 */

const User = require("../models/user.model");
const constants = require("../utils/constants");

validateSignupRequest = async(req,res,next)=>{
    //Validate if UserName exists
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed ! Username is not Provided"
        })
    }

    //Validate if the userId exists
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! UserId is not Provided"
        })
    }

    //Validate if the userId already present
    const user = await User.findOne({userId : req.body.userId});
    
    if(user != null){
        return res.status(400).send({
            message : "Failed ! User Already exists"
        })
    }

    //Validate if the email exists
    if(!req.body.email){
        return res.status(400).send({
            message : "Failed ! Email is not Provided"
        })
    }

    //Validate if the email already present
    const email = await User.findOne({email : req.body.email});
    
    if(email != null){
        return res.status(400).send({
            message : "Failed ! Email Already exists"
        })
    }

    //Validate if the password exists
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! Password is not Provided"
        })
    }

    /**
     * Validation for the userType
     */

    const userTypes = [constants.userTypes.admin, constants.userTypes.customer, constants.userTypes.engineer];
    const userType = req.body.userType;
    if(userType && !userTypes.includes(userType)){
        return res.status(400).send({
            message : "Failed ! User Type is not correctly Provided"
        })
    }

    next();
}

module.exports = {
    validateSignupRequest : validateSignupRequest
}