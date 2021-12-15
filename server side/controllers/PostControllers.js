const Posts = require('../models/PostsSchema');

// creating Post
const createPost = async (req,res) => {
    const { title , body , image , postedBy } = req.body;

    if (!title || !body  || !image) {
        return res.json({message: "Please fill Required Fields" , status: 404})
    }

    try {
        const newPost = new Posts({title, body, postedBy: req.user, image , createdAt: new Date().toISOString() }); // here req.user is got from jwt
        await newPost.save()

        res.json({ status: 200 , newPost});
    } catch (error) {
        console.log(`error in controller and error is : `, error)
        res.json({message: `Error is ${error}`})
    }
}

//  getting All posts
const getAllPosts = async (req,res) => {
    try {
        const allPosts = await Posts.find().populate("postedBy", "id name");
        res.status(200).json({Posts: allPosts});
    } catch (error) {
        console.log("Error in getAllPosts controller amd error is : ", error)
    }
}

// getting ALlpsots a Single User
const getMyPosts = async (req,res) => {
    const { postId } = req.params;

    try {
        const allPosts = await Posts.find({postedBy: postId});

        res.status(200).json({allPosts})
    } catch (error) {
        console.log("Error in getMyPosts ad error is :  ", error)
    }
}


// getting ALl psots a Single User
const getMyTotPosts = async (req, res) => {
    const { Id } = req.params;

    try {
        const postCount = await Posts.find({postedBy:Id}).count();

        res.status(200).json({postCount})
    } catch (error) {
        console.log("Error in getMyPosts ad error is :  ", error)
    }
}


// adding Like
const addLike = async (req, res) => {
    const { id , userId }  = req.params;
    console.log("In Likes")
    try {
        const updatedPost = await Posts.findByIdAndUpdate({ _id: id}, { $inc: { likes: 1 } ,  $push: { likesArray: userId  }} , { new: true} );

        res.status(200).json({updatedPost})
    } catch (error) {
        console.log("Error in addLike Conyroller  error is :  ", error)
    }
}


// Removing Like
const disLike = async (req, res) => {
    const { id , userId }  = req.params;
    console.log("In Dislikes")
    try {

        const post = await Posts.findById(id)

        if(post.likes > 0 ){
            post.likes -= 1;
        }else{
            post.likes = 0;
        }

        const index = post.likesArray.findIndex((id) => id === userId)

        if (index === -1) {
            post.likesArray.push(userId);
        } else {
            post.likesArray = post.likesArray.filter((id) => id !== userId)
        }

        const updatedPost = await Posts.findByIdAndUpdate(id,  post , {new: true} )

        res.status(200).json({updatedPost})
    } catch (error) {
        console.log("Error in DisLike Conyroller  error is :  ", error)
    }
}




module.exports = {
    createPost,
    getAllPosts,
    getMyPosts,
    getMyTotPosts,
    addLike,
    disLike
}