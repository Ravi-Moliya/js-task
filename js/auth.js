const form = document.querySelector('#myForm');
const login_Form = document.querySelector('form[name="myLoginForm"]');

const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');

const ls = window.localStorage;
const loginLink = document.querySelector('a[id="login-link"]')
const registerLink = document.querySelector('a[id="register-link"]')
console.log(loginLink, registerLink);

loginLink.addEventListener('click', function() {
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
});
registerLink.addEventListener('click',function() {
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
});
const validationMsg = document.querySelectorAll('.validationMsg');
const sName = document.querySelector('#name');
const sEmail = document.querySelector('#email');
const nMobile = document.querySelector('#mobile');
const sPassword = document.querySelector('#password');
const sDoB = document.querySelector('#dob');
const sGender = document.querySelectorAll('input[type="radio"]');

let bName = true, bEmail = true, bMobile = true, bDoB = true, bPassword = true;

sName.addEventListener('blur',(e)=>{
    if((/[a-zA-Z]{3,15}/g).test(e.target.value)){
        validationMsg[0].style.color = 'black';
        bName = false;
    }
    else {
        validationMsg[0].style.color = 'red';
        bName = true;
    }
});
sEmail.addEventListener('blur',(e)=>{
    if((/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).test(e.target.value)){
        validationMsg[1].innerHTML = '* Email id is valid...';
        validationMsg[1].style.color = 'black';
        bEmail = false;
    }
    else {
        validationMsg[1].innerHTML = '* Email id is not valid...';
        validationMsg[1].style.color = 'red';
        bEmail = true;
    }
});
nMobile.addEventListener('blur',(e)=>{
    if((/^\d{10}$/).test(e.target.value)){
        validationMsg[2].style.color = 'black';
        bMobile = false;
    }
    else {
        validationMsg[2].style.color = 'red';
        bMobile = true;
    }
});
sDoB.addEventListener('blur',(e)=>{
    const dob = e.target.value;
    if(!dob){
        validationMsg[3].style.color = 'red';
        bDoB = true;
    }
    else {
        validationMsg[3].style.color = 'black';
        bDoB = false;
    }
});
sPassword.addEventListener('blur',(e)=>{
    if((/[a-zA-Z0-9]{3,15}/g).test(e.target.value)){
        validationMsg[4].style.color = 'black';
        bPassword = false;
    }
    else {
        validationMsg[4].style.color = 'red';
        bPassword = true;
    }
});
function emptyFieldValue(){
    sName.value = '';
    sEmail.value = '';
    nMobile.value = '';
    sGender[0].checked = true;
    sDoB.value = '';
    sPassword.value = '';
}
form.onsubmit = function(e){
    e.preventDefault();        
    sName.addEventListener('blur',(e)=>{
        if((/[a-zA-Z]{3,15}/g).test(e.target.value)){
            validationMsg[0].style.color = 'black';
            bName = false;
        }
        else {
            validationMsg[0].style.color = 'red';
            bName = true;
        }
    });
    sEmail.addEventListener('blur',(e)=>{
        console.log((/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).test(e.target.value));
        if((/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/).test(e.target.value)){
            validationMsg[1].innerHTML = '* Email id is valid...';
            validationMsg[1].style.color = 'black';
            bEmail = false;
        }
        else {
            validationMsg[1].innerHTML = '* Email id is not valid...';
            validationMsg[1].style.color = 'red';
            bEmail = true;
        }
    });
    nMobile.addEventListener('blur',(e)=>{
        console.log((/^\d{10}$/).test(e.target.value));
        if((/^\d{10}$/).test(e.target.value)){
            validationMsg[2].style.color = 'black';
            bMobile = false;
        }
        else {
            validationMsg[2].style.color = 'red';
            bMobile = true;
        }
    });
    sDoB.addEventListener('blur',(e)=>{
        const dob = e.target.value;
        if(!dob){
            validationMsg[3].style.color = 'red';
            bDoB = true;
        }
        else {
            validationMsg[3].style.color = 'black';
            bDoB = false;
        }
    });
    sPassword.addEventListener('blur',(e)=>{
        console.log((/[a-zA-Z0-9]{3,15}/g).test(e.target.value));
        if((/[a-zA-Z0-9]{3,15}/g).test(e.target.value)){
            validationMsg[4].style.color = 'black';
            bPassword = false;
        }
        else {
            validationMsg[4].style.color = 'red';
            bPassword = true;
        }
    });

    let users, emails, phones, genders, dobs, passwords, uniqe;
    if(bName==false && bEmail==false && bMobile==false && bDoB==false && bPassword==false){
        if(ls.getItem('users')==null && ls.getItem('emails')==null && ls.getItem('phones')==null && ls.getItem('genders')==null && ls.getItem('dobs')==null && ls.getItem('passwords')==null ){
            users = [], emails = [], phones = [], genders = [], dobs = [], passwords=[];
        }        
        else {
            users = JSON.parse(ls.getItem('users'));
            emails = JSON.parse(ls.getItem('emails'));
            phones = JSON.parse(ls.getItem('phones'));
            dobs = JSON.parse(ls.getItem('dobs'));
            genders = JSON.parse(ls.getItem('genders'));
            passwords = JSON.parse(ls.getItem('passwords'));
        }
        // console.log('emails - ',emails, emails=='',emails!='');
        if(emails!=''){
            emails.forEach((e)=>{
                if(e==sEmail.value){
                    console.log(e,sEmail.value);
                    uniqe = false;
                }
                else {
                    console.log(e,sEmail.value);
                    uniqe = true;
                }
            });
        }
        else {
            uniqe = true;
        }
        // console.log('uniqe - ',uniqe);
        if(uniqe==true){
            users.push(sName.value);
            emails.push(sEmail.value);
            phones.push(nMobile.value);
            sGender.forEach((node)=>{
                if(node.checked){
                    genders.push(node.getAttribute('id'));
                }
            });
            dobs.push(sDoB.value);
            passwords.push(sPassword.value);
            ls.setItem('users', JSON.stringify(users));
            ls.setItem('emails', JSON.stringify(emails));
            ls.setItem('phones', JSON.stringify(phones));
            ls.setItem('genders', JSON.stringify(genders));
            ls.setItem('dobs', JSON.stringify(dobs));
            ls.setItem('passwords', JSON.stringify(passwords));       
            emptyFieldValue();
        }
        else {
            alert('Email already exist...');
        }
    }
    else {
        alert('One or more Inputs are Invalid...');
    }
}


// Login form validaiton...
const sLoginEmail = document.querySelector('#login-email');
const sLoginPassword = document.querySelector('#login-password');

// Login form submit event....
login_Form.onsubmit = function(e){
    e.preventDefault();     
    if(sLoginEmail && sLoginPassword) {
        let emails, passwords, key, activeUser;
        if(ls.getItem('emails')==null && ls.getItem('passwords')==null ){
            alert('Emailid Doesn\'t exist');
        }        
        else {
            emails = JSON.parse(ls.getItem('emails'));
            phones = JSON.parse(ls.getItem('phones'));
            passwords = JSON.parse(ls.getItem('passwords'));
            emails.forEach((email, i)=>{
                if(email==sLoginEmail.value || sLoginEmail.value==phones[i]) {
                    key = i;
                    activeUser = email;
                }
            });
            if(passwords[key]==sLoginPassword.value) {
                ls.setItem('active',activeUser)
                alert('Redirect to Profile page...');
                window.location.href = 'profile.html';
            }
            else {
                alert('Emailid or Password Doesn\'t Match...');
            }
        }
    }
}