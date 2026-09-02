const express = require('express');
const cookieParser = require('cookie-parser') // This line imports the cookie-parser middleware, which is used to parse cookies from incoming HTTP requests. It allows us to easily access and manipulate cookies in our application.
const cors = require('cors') //enable Cross-Origin Resource Sharing (CORS) allows us to specify which domains are allowed to access our API resources, enhancing security and enabling communication between different origins.

const app = express() // we are creating an instance of the express application . This instance will be used to define routes, middleware for our web application.
app.use(express.json())  // which will allow us to parse (add) the incoming JSON data in the request body;
app.use(cookieParser()) // we are using the cookie-parser middleware in our application, which will allow us to parse cookies from incoming HTTP requests. This is essential for handling authentication tokens and other cookie-based data in our application.
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true
}))



/* require all the routes here */
const authRouter = require("./routes/auth.routes") 
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter) 
app.use("/api/interview" , interviewRouter)


module.exports = app;