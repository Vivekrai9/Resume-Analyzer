const mongoose = require('mongoose'); // This line imports the Mongoose library, which is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data.

async function connectToDB(){
    try{await mongoose.connect(process.env.MONGO_URI)


    console.log('Connected to Database');
    }
    catch(err){ 
        console.error('Error connecting to Database:', err);
    }
}


module.exports = connectToDB; // This line exports the connectToDB function, making it available for import in other files. This allows us to establish a connection to the MongoDB database when needed.