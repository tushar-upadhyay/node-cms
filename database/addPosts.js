const Posts = require('./models/tutorials');
function addPosts({title,body,imageUrl,author,comments=[],subHeading}){
    let date = String(new Date());
    date = date.split(' ');
    date = date[2] + " " + date[1] + " " + date[3];
    try {
        const post = new Posts({
            title,
            body,
            imageUrl,
            author,
            subHeading,
            date
        });
        post.save((err)=>{
            if(err){
                throw Error(err);
            }
            return "success";
        });
    }
    catch (e) {
       throw Error(e);
    }
}
module.exports = addPosts;
