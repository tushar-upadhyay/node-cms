function checkAuth(req,res,next){
    if(req.session.email){
        return next();
    }
    else res.redirect('/auth/login');
}
function checkAuthAddPost(req,res,next){
    if(req.session.email){
        return next();
    }
    else res.json({'error':'You are not authorized to alter a Post'});
}
module.exports = {checkAuth,checkAuthAddPost};