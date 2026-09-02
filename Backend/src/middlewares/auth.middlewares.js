const jwt = require("jsonwebtoken")

const tokenBlacklistModel = require("../models/blacklist.model")



async function authUser(req, res, next) {

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not provided."
        })
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "Token is invalid. Please login again."
        })
    }




    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = decoded // here we have added a new property to the request object. it is not predefined ,it is only defined here.
                       // we are adding the decoded user data ,so that we can access it in the next middleware.
                       
    next() // we are calling here the next middleware. if we don't call next(), the request will be stuck in this middleware and will not proceed to the next middleware .
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token."
        })
    }
}

module.exports = {authUser}