const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { createPost,
        getAllPosts,
        getMyPosts,
        getMyTotPosts,
        addLike,
        disLike
} = require('../controllers/PostControllers')


// craeteing Post
router.post('/createPost', auth, createPost);

// getting All  Posts
router.get('/getAllPosts', getAllPosts)

// getting User Posts by user
router.get('/getMyPosts/:postId', getMyPosts);

// getting User Posts by user
router.get('/getMyTotPosts/:Id', getMyTotPosts);

// Adding Like to Post
router.get('/addLike/:id/:userId', auth ,  addLike);

// Removing  like to Post
router.get('/disLike/:id/:userId', auth, disLike);


module.exports = router;