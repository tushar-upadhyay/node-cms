const Posts = require('./models/tutorials');
function addComment({title,author,comment}){
    const comment_ = {author,comment,date:String(new Date())};
    Posts.update({title:title},{$push:{comments:comment_}},{new:true},(err,res)=>{
        if(err) throw Error('Some Error Occured');
        return
    });
};
module.exports = addComment;
