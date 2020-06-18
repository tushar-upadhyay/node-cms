const Posts = require('./models/tutorials');
async function deletePost({title}){
    return  (await Posts.deleteOne({title}))['deletedCount'];
}
module.exports = deletePost;
