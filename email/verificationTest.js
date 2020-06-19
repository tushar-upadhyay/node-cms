var sendVerification = require("./verification");
console.log('tusha');
console.log(sendVerification('tusharrockpg@gmail.com').then(res=>console.log(res)).catch(err=>console.log(err)));