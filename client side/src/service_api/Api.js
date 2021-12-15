const axios = require('axios');

const API = axios.create({
    baseURL: 'http://localhost:5000'
});

// this is for using local storage in headers, otherwise it will not work
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;

});


const signUp = (formData) => API.post(`/signup`, formData );
const signIn = (formData) => API.post(`/signin`, formData);
const createpost = (postData) => API.post(`/createPost`, postData);
const getMyPosts = (postId) => API.get(`/getMyPosts/${postId}`);
const getMyTotalPosts = (Id) => API.get(`/getMyTotPosts/${Id}`);
const getUserProfile = (id) => API.get(`/getUserProfile/${id}`);
const getAllPosts = () => API.get(`/getAllPosts`);
const getAllUsers = () => API.get(`/getAllUsers`);
const getAllUsersExpOne = (id) => API.get(`/getAllUsers/${id}`);
const addLike = (id, userId) => API.get(`/addLike/${id}/${userId}`);
const disLike = (id, userId) => API.get(`/disLike/${id}/${userId}`);
const addFollower = (id, userId) => API.get(`/addToFollwoing/${id}/${userId}`);
const UnFollower = (id, userId) => API.get(`/addToUnFollwoing/${id}/${userId}`);
const addtoSaved = (postId , userId) => API.get(`/addToSaved/${postId}/${userId}`);
const RemoveSavedPost = (postId, userId) => API.get(`/removefromSaved/${postId}/${userId}`);
const getSavedArray = (id) => API.get(`/getUserSavedArray/${id}`);


module.exports = {
    signUp,
    signIn,
    createpost,
    getMyPosts,
    getAllPosts,
    getAllUsers,
    getUserProfile,
    getAllUsersExpOne,
    addLike,
    disLike,
    getMyTotalPosts,
    addFollower,
    UnFollower,
    addtoSaved,
    getSavedArray,
    RemoveSavedPost
}