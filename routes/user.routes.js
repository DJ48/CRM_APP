/**
 * This file will act as the route for user resource
 */

// define the routes - REST endpoints for user 

const userController = require("../controllers/user.controller");
const { authJwt } = require("../middlewares")

module.exports = (app)=>{
    app.get("/crm/api/v1/users",[ authJwt.verifyToken, authJwt.isAdmin ],userController.findAllUser);
    app.get("/crm/api/v1/users/:userId",[ authJwt.verifyToken ],userController.findUserById);
    app.put("/crm/api/v1/users/:userId", [authJwt.verifyToken,authJwt.isAdmin], userController.updateUser);
}