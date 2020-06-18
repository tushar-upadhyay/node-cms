const UserModel = require('./models/user');
const bcrypt = require('bcryptjs');
async function register({email,password,name}){
    let User = await UserModel.findOne({email});
        if(User!=null) return false;
        let hashed = await bcrypt.hash(password, 10);
        User = new UserModel({
            email,
            password:hashed,
            verified:'false',
            name
        });
        await User.save();
        return true;
}
async function login({email,password}){
    let user = await UserModel.findOne({email});
    console.log(user);
    if(!user) return false;
    return await bcrypt.compare(password,user.password);
}
module.exports = {login,register};
