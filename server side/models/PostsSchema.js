const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "no Image"
    },
    postedBy: {
        type: ObjectId,
        ref: "USERS"
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likes: {
        type: Number,
        default: 0,
    },
    likesArray: {
        type: [String],
        default: [],
    },
})

const Posts = mongoose.model('Post', PostSchema);

module.exports = Posts;