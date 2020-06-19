const {Router} = require('express');
const {checkAuth} = require('./middlewares/checkAuth');
const {login,register,verifyEmail,requestOtp} = require('../database');
const router = Router();
router.post('/login',async (req,res)=>{
   const {email,password} = req.body;
   const log = await login({email,password});
   if(log=="success"){
      req.session.email = email;
      return res.json({login:'success'});
   }
   else if(log=="Email Not Verified"){
      req.session.temp_email = email;
      res.json({login:'Email not verified'});
   }
   else res.json({login:'Email or Password is Invalid'});
});
router.get('/verifyEmail',(req,res)=>{
   if(req.session.temp_email){
     return res.render('verifyEmail');
   }
   res.redirect('/auth/login');
});
router.get('/logout',(req,res)=>{
   req.session.destroy(function(err) {
      req.session = null;
      res.clearCookie('login_session');
      return res.redirect('/tutorials');
   });
});
router.post('/requestOtp',async (req,res)=>{
   const email = req.session.temp_email;
   if(!email) return res.redirect('/auth/login');
   let otpres = await requestOtp({email});
   res.json({'otp':otpres});
});
router.post('/verifyOtp',async (req,res)=>{
   const {otp} = req.body;
   const email = req.session.temp_email;
   if(!email || !otp) res.redirect('/tutorials');
   let response = await verifyEmail({email,otp});
   if(response=="Email Verified"){
      req.session.email = email;
      req.session.temp_email = null;
      return res.json({'verification':response});
   }
   return res.redirect('/tutorials');
});
router.post('/signup',async (req,res)=>{
   const {email,password,name} = req.body;
   const reg = await register({email,password,name});
   if(reg===true) {
      req.session.temp_email = email;
      return res.json({register: "success"});
   }
   else res.json({register:reg});
});
router.get('/login',(req,res)=>{
   res.render('login');
});
module.exports = router;