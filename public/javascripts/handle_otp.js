async function handle_otp(e){
    e.preventDefault();
    const otp = document.getElementById('otp');
    if(!otp.value) return
    const btnName = document.getElementById('btn-name');
    const loader = document.getElementById('loader');
    btnName.style.display = "none";
    loader.style.display = "block";

    let res = await fetch('/auth/verifyOtp',{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            otp:otp.value,
        })
    });
    try {
        res = await res.json();
        return window.location.replace('/tutorials');
    }
    catch (e) {
        btnName.style.display = "block";
        loader.style.display = "none";
        otp.classList.add('invalid');
    }

}
async function handle_otp_resend(e){
    e.preventDefault();
    const btnName = document.getElementById('resend-name');
    const loader = document.getElementById('loader');
    btnName.style.display = "none";
    loader.style.display = "block";
    let res = await fetch('/auth/requestOtp',{
        method:"POST"
    });
    try {
        res = await res.json();
        btnName.style.display = "block";
        loader.style.display = "none";
        alert('Otp sent successfully!');

    }
    catch (e) {
        return window.location.replace('/tutorials');

    }

}