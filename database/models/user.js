const {Schema,model} = require('mongoose');
const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    verified:String,
    otp:String
});
const UserModel = model('users',userSchema);
module.exports = UserModel;