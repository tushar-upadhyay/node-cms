const {Router} = require('express');
const {checkAuth} = require('./middlewares/checkAuth');
const {login,register} = require('../database');
const router = Router();
router.post('/login',async (req,res)=>{
   const {email,password} = req.body;
   const log = await login({email,password});
   if(log){
      req.session.email = email;
      res.redirect('/tutorials');
   }
   else res.redirect('/auth/login');
});
router.get('/logout',(req,res)=>{
   req.session.destroy(function(err) {
      req.session = null;
      res.clearCookie('login_session');
      return res.redirect('/tutorials');
   });
});
router.post('/register',async (req,res)=>{
   const {email,password,name} = req.body;
   const reg = await register({email,password,name});
   console.log(reg);
   reg===true?res.json({register:"success"}):res.json({register:'False'});
});
router.get('/login',(req,res)=>{
   res.render('login');
});
module.exports = router;