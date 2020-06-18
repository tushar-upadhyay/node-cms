const Posts = require('./models/tutorials');
async function getPostByTitle(title){
    return await Posts.find({title});
}
async function getAllPosts(){
    return await Posts.find({},{_id:0,_v:0}).limit(10);
}
module.exports = {getAllPosts,getPostByTitle};