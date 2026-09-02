
require('dotenv').config() // This line loads environment variables from a .env file into process.env, allowing us to access them in our application.
const app = require("./src/app") 
const connectToDB = require("./src/config/database")
// const invokeGeminiAi = require("./src/services/ai.service")
// const { resume, selfDescription, jobDescription } = require("./src/services/temp")
// const {generateInterviewReport} = require("./src/services/ai.service")



connectToDB() // This line calls the connectToDB function, which establishes a connection to the MongoDB database using Mongoose.
// invokeGeminiAi() 
// generateInterviewReport({ resume, selfDescription, jobDescription })



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});