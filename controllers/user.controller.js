/**
 * This file will have all the logic to manipulate the user resource
*/
const User = require("../models/user.model");
const objectConverter = require("../utils/objectConverter");

/**
 * Fetch the list of all Users
 *      - Only admin is allowed
 *      - Admin should be able to filter based on
 *          1. Name
 *          2. userType
 *          3. userStatus
 */
exports.findAllUser = async(req,res)=>{
    /**
     * Read the data from the query param
     */

    const nameReq = req.query.name;
    const userStatusReq = req.query.userStatus;
    const userTypeReq = req.query.userType;
 
    const mongoQueryObj = {}
    if (nameReq && userStatusReq && userTypeReq) {
        mongoQueryObj.name = nameReq;
        mongoQueryObj.userStatus = userStatusReq;
        mongoQueryObj.userType = userTypeReq;
 
    } else if (userStatusReq && userTypeReq) {
        mongoQueryObj.userStatus = userStatusReq;
        mongoQueryObj.userType = userTypeReq;
    } else if (nameReq && userStatusReq) {
        mongoQueryObj.name = nameReq;
        mongoQueryObj.userStatus = userStatusReq;
 
    } else if (nameReq && userTypeReq) {
        mongoQueryObj.name = nameReq;
        mongoQueryObj.userType = userTypeReq;
    } else if (nameReq) {
        mongoQueryObj.name = nameReq;
    } else if (userTypeReq) {
        mongoQueryObj.userType = userTypeReq;
    } else if (userStatusReq) {
        mongoQueryObj.userStatus = userStatusReq;
    }
 
    try{
        const users = await User.find(mongoQueryObj);

        return res.status(200).send(objectConverter.userResponse(users));
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Internal error while fetching all users"
        })
    }
}

/**
 * Fetch the user based on the userId
 */
exports.findUserById = async(req,res)=>{
    const userId = req.params.userId;
    try{
        const user = await User.find({ userId : userId});
        if(user.length){
            res.status(200).send(objectConverter.userResponse(user))
        }else{
            res.status(200).send({
                message : "User with id " + userId + " doesn't exist"
            })
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message : "Internal error while fetching the user."
        })
    }
}

/**
 *  Update the user - status, type
 *      - only Admin should be allowed to do this
 */

 exports.updateUser = (req, res) => {
    /**
     * One of the ways of updating
     */

    try {
        const userIdReq = req.params.userId;

        const user = User.findOneAndUpdate({
            userId: userIdReq
        }, {
            name: req.body.name,
            userStatus: req.body.userStatus,
            userType: req.body.userType
        }).exec();

        res.status(200).send({
            message: "User record succesfully updated"
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Internal server error while updating"
        })
    }

}