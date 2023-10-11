//Import the mongoose module
import mongoose from "mongoose"
//Use the module to genrrate a UserSchema
//mongoose.Schema() function takes a schema definition object as a parameter
//to generate a new Mongoose schema object
const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },

    description: {
        type: String
    },

    price: {
        type: Number
    },

    quantity: {
        type: Number
    },

    category: {
        type: String
    }
});
//export this user module as a default export of thi module
export default mongoose.model('product', ProductSchema)

/*
The user schema definition object will declare all user data fields and associated properties
The schema will record user-related information including name, email, created-at and last-updated-at
timestamps, hashed passwords, and then the associated unique password salt.
*/