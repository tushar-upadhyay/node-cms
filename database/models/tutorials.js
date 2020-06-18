const {Schema,model} = require('mongoose');
const tutorialSchema = new Schema({
    title:String,
    subHeading:String,
    body:String,
    imageUrl:String,
    comments:[{comment:String,author:String,date:String}],
    date:String,
    author:String
});
const Posts = new model('posts',tutorialSchema);
module.exports = Posts;
