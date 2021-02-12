const ls = window.localStorage;
const active = ls.getItem('active');
if(active===null){
    window.location.href = 'index.html';
}
else{
    const sLogout = document.querySelector('#logout');
    const sTime = document.querySelector('#time');
    const sGify = document.querySelectorAll('.gifies');    
    
    // Real Time...
    const GetTime = ()=>(sTime.innerHTML = new Date().toLocaleTimeString())
    setInterval(GetTime,1000);

    //Gify Generater
    getGify();
    function getGify() {
        const API_KEY = '64YLX5t8bMkbmqTFF1pBHJ2suYHicCCy';
        const url = `http://api.giphy.com/v1/gifs/random?q=nature&api_key=${API_KEY}&limit=2`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const gifUrl = data.data;
                sGify[0].src = gifUrl.embed_url;
            });
    }
    setInterval(getGify, 1000*60*2);

    sLogout.addEventListener('click',(e)=>{
        ls.removeItem('active');
        window.location.href = 'index.html';
    });

}