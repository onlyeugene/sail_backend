const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    },
    gender:{
        type: String,
    },
    dob: {
        type: Number,
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
    },
    bio: {
        type: String
    }, 
    hobbies: {
        type: String
    }, 
    education: {
        type: String
    },
    occupation:{
        type: String
    },
    location: {
        type: String
    },
    stateOfOrigin: {
        type: String
    },
    image: {
        type: String
    }
},{
    timestamps: true
})

const User = mongoose.model('User', UserSchema);

module.exports = User