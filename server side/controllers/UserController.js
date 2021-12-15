const Users = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY  = process.env.JWT_SECRET_KEY

// crating new User
const createUser = async (req,res) => {
    const { name , email , password , confirmpassword , userPhoto } = req.body;
    if (!email || !password || !confirmpassword || !name || !userPhoto) {
        return res.json({ message: "Please Fill All Requited Fields" , status: 404 })
    }

    const isUserExists = await Users.findOne({email});
    if(isUserExists){
        return res.json({ message: "User Already Exists" , status: 404 })
    }

    if(password !== confirmpassword){
        return res.json({ message: "Passwords Do not Match" , status: 404 })
    }

    const hashedPassword = await bcrypt.hash(password, 10); // hashing password

    const newUser = new Users({name , email , password: hashedPassword , userPhoto})

    try {
        await newUser.save();


        return res.json({ newUser  , status: 200 })
    } catch (error) {
        console.log("error in controller and error is : ", error)
        return res.json({message: 'Opps! Some Error Occured, Please Try Again.' , status: 500})
    }

}

// Sigin In
const SignIn = async (req,res)  => {
    const { email  , password } = req.body;

    if (!email || !password ) {
        res.json({
            message: "Please Fill All Requited Fields",
            status: 404
        })
    }
    try {
        const isUserExists = await Users.findOne({email});
            if(!isUserExists){
                return res.json({ message: "User Not Found!!!" , status: 404})
            }

            const isPasswordCorrect = await bcrypt.compare(password, isUserExists.password); // comparing password
            if (!isPasswordCorrect) {
                return res.json({
                    message: 'Invalid Credientials',
                    status: 401
                })
            }

            const token = jwt.sign({email: isUserExists.email, id: isUserExists._id} , JWT_SECRET_KEY , {expiresIn: '24h'}); // gentating token

            res.json({
                result: isUserExists,
                token,
                status: 200
            });
    } catch (error) {
        console.log('Error in Controller and error is : ' , error)
        return res.json({
                    message: 'Opps! Some Error Occured, Please Try Again.',
                    status: 404
                })
    }

}

// getting all users
const getAllUsers = async (req,res) => {
    try {
        const users = await Users.find({} , {email: 0 , password: 0 }).limit(10);

        res.status(200).json({users})
    } catch (error) {
        console.log("Error in controller of getALlusers and erro is ", error)
    }
}

// getting Any user Info
const getAnyUserInfo = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const allPosts = await Users.findOne({
            _id: id
        });

        res.status(200).json({
            allPosts
        })
    } catch (error) {
        console.log("Error in getAnyUsrInfo ad error is :  ", error)
    }
}

// getting all users Except One User
const getAnyUserInfoExpOne = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const users = await Users.find({ _id: { $ne: id }} , {email: 0 , password: 0 }).limit(10);

        res.status(200).json({users})
    } catch (error) {
        console.log("Error in controller of getALlusers and erro is ", error)
    }
}

// adding Following
const addToFollowing = async (req, res) => {
    const { id , userId }  = req.params;
    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id: userId}, { $inc: { following: 1 } ,  $push: { followingArray: id  }} , { new: true} );
        const updatedsender = await Users.findByIdAndUpdate({ _id: id}, { $inc: { followers: 1 } ,  $push: { followersArray: userId  }} , { new: true} );

        res.status(200).json({updatedUser , updatedsender})
    } catch (error) {
        console.log("Error in addLike Conyroller  error is :  ", error)
    }
}

// Removing Follwoing
const UnFollow = async (req, res) => {
    const { id , userId }  = req.params;
    console.log("In Unfollowe")
    try {

        const user = await Users.findById(id)// profile
        const userSender = await Users.findById(userId); // user/sender

        if (userSender.folllowing > 0) {
            userSender.following -= 1;
        }else{
            userSender.following = 0;
        }


        if (userSender.folllowers > 0) {
            userSender.followers -= 1;
        } else {
            userSender.followers = 0;
        }



        if (user.folllowers > 0) {
            user.followers -= 1;
        }else{
            user.followers = 0;
        }

        if (user.folllowing > 0) {
            user.following -= 1;
        } else {
            user.following = 0;
        }

        const index = user.followersArray.findIndex((id) => id === id)

        if (index === -1) {
             user.followersArray.push(id);
        } else {
            user.followersArray = user.followingArray.filter((id) => id !== id)
        }

         const indexNone = user.followingArray.findIndex((id) => id === id)

         if (indexNone === -1) {
             user.followingArray.push(id);
         } else {
             user.followingArray = user.followingArray.filter((id) => id !== id)
         }







        const updateduser = await Users.findByIdAndUpdate(id,  user , {new: true} )

        // for sender
        const indexOne = userSender.followingArray.findIndex((id) => id === id)

        if (indexOne === -1) {
            userSender.followingArray.push(id);
        } else {
            userSender.followingArray = user.followingArray.filter((id) => id !== userId)
        }



        const indextwo = userSender.followersArray.findIndex((id) => id === id)

        if (indextwo === -1) {
            userSender.followersArray.push(id);
        } else {
            userSender.followersArray = user.followingArray.filter((id) => id !== userId)
        }

        const updateduserSender = await Users.findByIdAndUpdate(userId,  userSender , {new: true} )

        res.status(200).json({updateduser ,updateduserSender})
    } catch (error) {
        console.log("Error in DisLike Conyroller  error is :  ", error)
    }
}



// getting Usr saved Post Array
const getUserSaved = async (req, res) => {
    const { id } = req.params;
    try {
        const userData = await Users.find({_id: id} , {savedArray: 1});

        res.status(200).json({userData})
    } catch (error) {
        console.log("Error in controller of getALlusers and erro is ", error)
    }
}

// adding Asved Post
const addToSavedPost = async (req, res) => {
    const { postId, userId  }  = req.params;

    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id: userId}, { $inc: { saved: 1 } ,  $push: { savedArray: postId  }} , { new: true} );

        res.status(200).json({updatedUser})
    } catch (error) {
        console.log("Error in addLike Conyroller  error is :  ", error)
    }
}

// Unsaving   Post
const removeFromSaved = async (req, res) => {
    const { postId, userId  }  = req.params;

    try {
        const updatedUser = await Users.findByIdAndUpdate({ _id: userId}, { $inc: { saved: -1 } ,  $pull: { savedArray: postId  }} , { new: true} );

        res.status(200).json({updatedUser})
    } catch (error) {
        console.log("Error in addLike Conyroller  error is :  ", error)
    }
}



module.exports = {
    createUser,
    SignIn,
    getAllUsers,
    getAnyUserInfo,
    getAnyUserInfoExpOne,
    addToFollowing,
    UnFollow,
    addToSavedPost,
    getUserSaved,
    removeFromSaved
}