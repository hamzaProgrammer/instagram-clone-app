const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userPhoto : {
        type : String,
        require : true
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    followersArray : {
        type: [String],
        default: [],
    },
    followingArray:{
        type: [String],
        default: [],
    },
    saved : {
        type: Number,
        default: 0
    },
    savedArray: {
        type: [String],
        default: []
    }
})

const Users = mongoose.model('USERS', UserSchema);

module.exports = Users;