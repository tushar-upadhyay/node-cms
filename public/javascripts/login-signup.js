const title = document.getElementById('title');
const btnName = document.getElementById('btn-name');
const titleBottom = document.getElementById('title-bottom');
const titleBottomA = document.getElementById('title-bottom-a');
const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const loader = document.getElementById('loader');
function signup() {
    title.innerText = 'Sign Up';
    btnName.innerText = 'Register';
    titleBottom.innerText = 'Log In';
    titleBottomA.setAttribute('onclick','login()');
    injectName();
    form.setAttribute('onsubmit',`return handle_signup(event)`);
}
function login() {
    deleteName();
    title.innerText = 'Login';
    btnName.innerText = 'Login';
    titleBottom.innerText = 'Sign Up';
    titleBottomA.setAttribute('onclick','signup()');
    form.setAttribute('onsubmit',`return handle_login(event)`);

}
function injectName(){
    const parentDiv = document.getElementById('column');
    const div = document.createElement('div');
    div.className = "input-field col s6";
    div.id = "name-div";
    const i = document.createElement('i');
    i.className = "material-icons prefix";
    const icon_name = document.createTextNode('account_circle');
    i.append(icon_name);
    const inputforname = document.createElement('input');
    inputforname.className = 'input-color validate';
    inputforname.type = "text";
    inputforname.name = "name";
    inputforname.id = "name";
    const label = document.createElement('label');
    label.setAttribute('for','name');
    const labelText = document.createTextNode('Name');
    label.append(labelText);
    div.append(i);
    div.append(inputforname);
    div.append(label);
    parentDiv.prepend(div);
}

function deleteName() {
    const parentDiv = document.getElementById('column');
    const nameDiv = document.getElementById('name-div');
    parentDiv.removeChild(nameDiv);
}
async function handle_signup(e){
    e.preventDefault();
    const name = document.getElementById('name');
    if(!email.value || !password.value || !name.value){
        return
    }
    btnName.style.display = "none";
    loader.style.display = "block";

    let res = await fetch('/auth/signup',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value,
            name:name.value,
        })
    });
    res = await res.json();
    if(res['register']=="success"){
        return window.location.replace('/auth/verifyEmail');
    }

    email.classList.add('invalid');
    document.getElementsByClassName('helper-text')[0].setAttribute('data-error','Email Already Registered');
    btnName.style.display = "block";
    loader.style.display = "none";
}
async function handle_login(e){
    e.preventDefault();
    if(!email.value || !password.value){
        return
    }
    btnName.style.display = "none";
    loader.style.display = "block";
    let res = await fetch('/auth/login',{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value
        })
    });
    try {
        btnName.style.display = "flex";
        loader.style.display = "none";
        res = await res.json();
        if(res['login']=="success"){
            return  window.location.replace('/tutorials');
        }
        if(res['login']=="Email not verified"){
            return window.location.replace('/auth/verifyEmail');
        }
        password.classList.add('invalid');
        document.getElementsByClassName('helper-text')[0].setAttribute('data-error',res.login);
        email.classList.add('invalid');
    }
    catch (e) {

    }
}