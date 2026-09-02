


const mongoose = require('mongoose');  // This line imports the Mongoose library, It provides a straightforward, schema-based solution to model your application data.


const userSchema = new mongoose.Schema({ // This line defines a new Mongoose schema for the User model. A schema is a blueprint for the structure of the documents in a MongoDB collection.

    username: {
        type: String,
        unique: [true, "username already taken"],
        required: true

    },
    email: {
        type: String,
        unique: [true, "Account already exists with this email address "],
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const userModel = mongoose.model('User', userSchema) // This line creates a Mongoose model named 'User' based on the userSchema. The model provides an interface for interacting with the MongoDB collection associated with this schema, allowing us to perform CRUD operations (Create, Read, Update, Delete) on user documents in the database.

module.exports = userModel;
