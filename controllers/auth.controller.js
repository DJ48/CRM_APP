const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config");

/**
 * Controller for Signup / registration
 */

exports.signup = async(req,res) =>{

    //userStatus : APPROVED | PENDING | REJECTED
    /**
     * UserType : Customer, userStatus : Approved
     * UserType : Engineer, userStatus : Pending
     */

    var userStatus = req.body.userStatus;

    if(!userStatus){
        if(!req.body.userType || req.body.userType == constants.userTypes.customer){
            userStatus = constants.userStatus.approved;
        }else{
            userStatus = constants.userStatus.pending;
        }
    }

    const userObjToBeStoredInDB = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        userType : req.body.userType,
        password : bcrypt.hashSync(req.body.password,8),
        userStatus : userStatus
    }

    /**
     * Insert new user to the DB
     */
    try{
        const userCreated = await User.create(userObjToBeStoredInDB);
        console.log("User Created ", userCreated);

        /**
         * Return the response
         */

        const userCreatedResponse = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(userCreatedResponse);
    }
    catch(err){
        console.error("Error while creating new user: ", err.message);
        res.status(500).send({
            message : "some internal error while inserting new user"
        });
    }
}



/**
 * Controller for Signin
 */

exports.signin = async(req,res) =>{
    //Search the user if it exists
    try{
        var user = await User.findOne({userId : req.body.userId});
    }catch(err){
        console.log("Error Occured While logging")
    }
    if(user == null){
        return res.status(400).send({
            message : "Failed ! User doesn't exist."
        })
    }

    /**
     * Check if user is Approved
     */
    if(user.userStatus != constants.userStatus.approved){
        return res.status(200).send({
            message : "Can't allow the login as the User is still not approved"
        })
    }

    //User is existing, so now we will do the password matching

    const isPasswordVaild = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordVaild){
        return res.status(401).send({
            message : "Invalid Password"
        })
    }

    const token = jwt.sign({id : user.userId},authConfig.secret,{expiresIn:600} )

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token
    })
}