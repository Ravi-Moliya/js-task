const ls = window.localStorage;
let active = ls.getItem('active');
if(active===null){
    window.location.href = 'index.html';
}
else{
    const form = document.querySelector('#myForm');
    const sName = document.querySelector('#name');
    const sEmail = document.querySelector('#email');
    const nMobile = document.querySelector('#mobile');
    const sPassword = document.querySelector('#password');
    const sLogout = document.querySelector('#logout');
    const sTime = document.querySelector('#time');

    // Real Time...
    const GetTime = async ()=>(sTime.innerHTML = await (new Date().toLocaleTimeString()))
    setInterval(GetTime,1000);

    let users, emails, phones, passwords;
    users = JSON.parse(ls.getItem('users'));
    phones = JSON.parse(ls.getItem('phones'));
    emails = JSON.parse(ls.getItem('emails'));
    passwords = JSON.parse(ls.getItem('passwords'));
            
//     function getDB(){
//         return new Promise((resolve,reject)=>{
//             let users, emails, phones, passwords;
//             users = JSON.parse(ls.getItem('users'));
//             phones = JSON.parse(ls.getItem('phones'));
//             emails = JSON.parse(ls.getItem('emails'));
//             passwords = JSON.parse(ls.getItem('passwords'));
//             resolve({users, emails, phones, passwords});
//         });
// 6    }
     
//     function getDBData(){
//         let {users, emails, phones, passwords} = getDB();  
//         console.log(users, emails, phones, passwords);
//         return {users, emails, phones, passwords};
//     }
//     console.log(getDBData());
//     let {users, emails, phones, passwords} = getDBData();  
        
//     console.log('object- ', users, emails);
    // getDB().then((success)=>{
    //     console.log('sucess',success);
    //     // { users, emails, phones, passwords } = {...success};

    // }).catch((error)=>{
    //     console.log('error',error);
    // });
    
    
    emails.forEach((email, i)=>{
        if(email==active){
            sName.value = users[i]; 
            nMobile.value = phones[i]; 
            sEmail.value = emails[i]; 
            sPassword.value = passwords[i]; 
        }
    });
    form.onsubmit = function(e){
        e.preventDefault();        
        if(sName && sEmail && nMobile && sPassword) {
            let key;
            users = JSON.parse(ls.getItem('users'));
            phones = JSON.parse(ls.getItem('phones'));
            emails = JSON.parse(ls.getItem('emails'));
            passwords = JSON.parse(ls.getItem('passwords'));            
            emails.forEach((email, i)=>{
                if(email==active){
                    users[i] = sName.value; 
                    phones[i] = nMobile.value; 
                    key = i;
                    passwords[i] = sPassword.value; 
                } 
            });        
            emails[key] = sEmail.value;
            ls.setItem('active',emails[key]);
            ls.setItem('users', JSON.stringify(users));
            ls.setItem('phones', JSON.stringify(phones));
            ls.setItem('emails', JSON.stringify(emails));
            ls.setItem('passwords', JSON.stringify(passwords));
        }
        else {
            alert('One or more fileds are empty...');
        }
    }

    sLogout.addEventListener('click',(e)=>{
        ls.removeItem('active');
        window.location.href = 'index.html';
    });
}