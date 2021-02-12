const ls = window.localStorage;
const active = ls.getItem('active');
if(active===null){
    window.location.href = 'index.html';
}
else{

    const sLogout = document.querySelector('#logout');
    const sTime = document.querySelector('#time');
    
    // Real Time...
   const GetTime = ()=>(sTime.innerHTML = new Date().toLocaleTimeString())
   setInterval(GetTime,1000);

    // Current Location... 
    if(!navigator.geolocation){
        console.error('Your browser doesn\'t support Geolocation API...');
        alert('Your browser doesn\'t support Geolocation API...');
    }
    else {
        getWeather();
    }


    function getWeather() {
        let temperature = document.getElementById("temperature");
        let description = document.getElementById("description");
        let location = document.getElementById("location");
      
        let api = "https://api.openweathermap.org/data/2.5/weather";
        let apiKey = "436933180a8dbcb95e5b7605d7ec5ded";
        location.innerHTML = "Locating...";
        navigator.geolocation.getCurrentPosition(success, error);
      
        function success(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
      
          let url =
            api +
            "?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=" +
            apiKey +
            "&units=imperial";
      
          fetch(url)
            .then(response => response.json())
            .then(data => {
              let temp = data.main.temp;
              temperature.innerHTML = temp + "° F";
              location.innerHTML =
                data.name + " (" + latitude + "°, " + longitude + "°)";
              description.innerHTML = data.weather[0].main;
            });
        }
      
        function error(error) {
            switch(error.code){
                case error.PERMISSION_DENIED:
                    alert('You Denied request for Geolocation.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert('Location information is unavailable.');
                    break;
                case error.TIMEOUT:
                    alert('The request to get user location timed out.');
                    break;
                case error.UNKNOWN_ERROR:
                    alert('An unknown error occured.');
                    break;
            }
            alert('Unable to retrive your location...');
        }

      }

    sLogout.addEventListener('click',(e)=>{
        ls.removeItem('active');
        window.location.href = 'index.html';
    });

}