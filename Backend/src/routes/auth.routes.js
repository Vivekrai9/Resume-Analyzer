const express = require('express');
//const {Router} = require('express')
const authController = require("../controllers/auth.controller")

const authMiddleware = require("../middlewares/auth.middlewares")





const authRouter = express.Router()
//const authRouter = Router()


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController) // 

/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in the blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access Private
 */


authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

// This route is protected; only logged-in users can access it. The auth middleware checks if the token is valid and if the user is logged in. If the token is valid, it adds the user data to the request object and calls the next middleware; otherwise, it returns an error message.




module.exports = authRouter;








