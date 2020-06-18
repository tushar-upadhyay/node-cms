const Posts = require('./models/tutorials');
async function editPost({title,body,imageUrl,subHeading}){
    let post = await Posts.updateOne({title}, {
        $set: {
            title, body, imageUrl, subHeading
        }
    });
    console.log(post);
    return post;
}
module.exports = editPost;
