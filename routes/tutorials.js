const express = require('express');
const router = express.Router();
const {checkAuth,checkAuthAddPost} = require('./middlewares/checkAuth');
const {addPosts,addComment,getPostByTitle,getAllPosts,deletePost,editPost} = require('../database');

router.get('/',async (req,res)=>{
    let posts = await getAllPosts();
    if(req.session.email) return res.render('index',{posts,loggedIn:true})
    else return res.render('index',{posts});
});
router.get('/addPost',checkAuth,(req,res)=>{
   res.render('addPost');
});
router.get('/editPost/:title',checkAuthAddPost,async (req,res)=>{
    const title = req.params.title;
    let post = await getPostByTitle(title);
    if(post.length==0) return res.redirect('/tutorials');
    res.render('editPost',post[0]);
});
router.get('/:title',async (req,res)=>{
    const title = req.params.title;
    let posts = await getPostByTitle(title);
    if(posts.length==0) return res.redirect('/tutorials');
    let post = posts[0];
    if(req.session.email) post['loggedIn'] = true;
    res.render('tutorials',post);
});
router.get('/deletePost/:title',checkAuth,async (req,res)=>{
    const title = req.params.title;
    let result = await deletePost({title});
    if(result) return res.json({msg:'Post deleted'});
    res.json({msg:'error'});
});
router.post('/addPost',checkAuthAddPost,(req,res)=>{
    const {title,body,imageUrl,author,subHeading} = req.body;
    if(!title || !body || !subHeading) return res.json({'msg':'Some Fields are missing!'})
    try {
        addPosts({
            title,
            body,
            imageUrl,
            author,
            subHeading
        });
        res.json({'msg':'Success'});
    }
    catch (e) {
        res.json({'msg':'Some Error is Occured!'});
    }
});

router.post('/addComment',(req,res)=>{
    const {title,comment,author} = req.body;
    try{
        addComment({title,comment,author});
        res.redirect(`/tutorials/${title}`)
    }
    catch (e) {
         res.send({'msg':'Some Error Occured'});
    }
});
router.post('/editPost',checkAuthAddPost,async (req,res)=>{
    const {title,body,imageUrl,subHeading} = req.body;
    try {
        await editPost({
            title,
            body,
            imageUrl,
            subHeading
        });
        res.json({'msg':'Success'});
    }
    catch (e) {
        res.json({'msg':'Some Error is Occured!'});
    }
});

module.exports = router;
