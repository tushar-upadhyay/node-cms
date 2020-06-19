const addPosts = require('./addPosts');
const addComment = require('./addComment');
const deletePost = require('./deletePost');
const {getAllPosts,getPostByTitle} = require('./getposts')
const editPost = require('./editPost');
const {login,register,requestOtp,verifyEmail} = require('./auth');
module.exports = {addPosts,addComment,getPostByTitle,getAllPosts,login,register,deletePost,editPost,requestOtp,verifyEmail};