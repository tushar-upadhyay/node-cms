const UserModel = require('./models/user');
const bcrypt = require('bcryptjs');
const sendOtp = require('../email/verification');
async function verifyEmail({email,otp}){
    let user = await UserModel.findOne({email});
    if(user==null) return 'Email is not registered';
    if(user.verified=='true') return "Some Error Occurred";
    if(otp==user.otp){
        user.verified = "true";
        user.otp = undefined;
        await user.save();
        return "Email Verified";
    }
    return "Some Error Occured";
}
async function requestOtp({email}){
    let user = await UserModel.findOne({email});
    if (user==null) return "Some Error Occured";
    if(user.verified=='true') return "Some Error Occured";
    let otp = String(Math.floor(Math.random() * 1000000) + 1);
    user.otp= otp;
    await user.save();
    await sendOtp(email,otp);
    return "Otp Sent!";
}
async function register({email,password,name}){
    let User = await UserModel.findOne({email});
        if(User!=null) return 'Email is already registered';
        let hashed = await bcrypt.hash(password, 10);
        let otp = String(Math.floor(Math.random() * 1000000) + 1);
        User = new UserModel({
            email,
            password:hashed,
            verified:'false',
            name,
            otp
        });
        await User.save();
        await sendOtp(email,otp);
        return true;
}
async function login({email,password}){
    let user = await UserModel.findOne({email});
    console.log(user);
    if(!user) return false;
    let res =  await bcrypt.compare(password,user.password);
    if(res==false) return "Email or Password is Invalid"
    if(user.verified == 'true') return "success";
    return "Email Not Verified";
}
module.exports = {login,register,verifyEmail,requestOtp};
