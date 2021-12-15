const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { createUser,
        SignIn,
        getAllUsers,
        getAnyUserInfo,
        getAnyUserInfoExpOne,
        addToFollowing,
        UnFollow,
        addToSavedPost,
        getUserSaved,
        removeFromSaved
    } = require('../controllers/UserController');

router.post('/signup' , createUser)
router.post('/signin',  SignIn)
router.get('/getAllUsers', getAllUsers); // geting all users
router.get('/getUserProfile/:id', getAnyUserInfo); // getting any user Profile Info
router.get('/getAllUsers/:id', getAnyUserInfoExpOne); // getting any All users info except one who logged in
router.get('/addToFollwoing/:id/:userId', addToFollowing); // getting any All users info except one who logged in
router.get('/addToUnFollwoing/:id/:userId', UnFollow); // getting any All users info except one who logged in
router.get('/addToSaved/:postId/:userId', addToSavedPost); //
router.get('/removefromSaved/:postId/:userId', removeFromSaved); //
router.get('/getUserSavedArray/:id', getUserSaved);

module.exports = router;