const transporter = require('./transporter');
async function sendVerification(email,otp){
    const mailOptions = {
        from: 'admin@learningtutorials.tech',
        to: email,
        subject: 'Verify Email',
        html:`
            <h2>Hello thanks..</h2><br>
            <p>Please Verify Your email 
            <h3>Your Otp is ${otp}</h3>
            <br>
            <p>If you didn't make this request ignore this..</p>`
        };
    try {
        await transporter.sendMail(mailOptions);
        return "success";
    }
    catch (e) {
        console.log(e);
        return "error"
    }
}
module.exports = sendVerification;