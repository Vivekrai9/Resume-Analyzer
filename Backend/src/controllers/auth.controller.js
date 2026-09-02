const userModel = require("../models/user.model") // This line imports the userModel from the user.model.js file, allowing us to interact with the User collection in the MongoDB database using Mongoose.
const bcrypt = require('bcryptjs') // This line imports the bcrypt library, which is used for hashing passwords securely.
const jwt = require('jsonwebtoken') // This used for creating and verifying JSON Web Tokens for authentication purposes.

const tokenBlacklistModel = require("../models/blacklist.model")




/**
 * @name registerUserController
 * @description creates a new user document in the database and returns a success message upon successful registration.
 * @access Public
 *   
 */


//(asynchronous function) This function will handle the logic for registering a new user.
async function registerUserController(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })


    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })


    /* isUserAlreadyExists.username === username || isUserAlreadyExists.email === email */
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this username or email address"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )


    res.cookie("token", token,)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name loginUserController
 * @description login a user, excepts email and password in the request body.
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    //if user is not found, return an error message
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    //compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password)

    //if password is not valid, return an error message
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }


    //if password is valid, create a token and send it to the client
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )

    res.cookie("token", token,) //set the token in the cookie


    //return a success message and the user data to the client
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in the blacklist
 * @access Public
 */

async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully"
    })

}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access Private
 */

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({

        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,

} 