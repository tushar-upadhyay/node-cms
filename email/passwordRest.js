var transporter = require('./transporter');
module.exports = function sendForgetPasswordEmail(email,success,error){
const mailOptions = {
    from: 'naukrialertshelp@gmail.com',
    to: email,
    subject: 'Verify Email',
    html:`
        <h2>Hello Greetings from Learning tutorials</h2><br>
        <h2>
         We have Recieved a Password Reset Request 
        </h2>
        <p>Reset password by clicking <a href="${}">Here</a>
        <br>
        <p>If you didn't make this request ignore this..</p>
    `
    };
transporter.sendMail(mailOptions, function(err, info){
    if (err) {
        console.error(err);
    } else {
        console.log('success')
        success(info);
    }
});
}
