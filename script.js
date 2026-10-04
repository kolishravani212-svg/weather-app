let input=document.querySelector("input");
let search=document.querySelector("#search-btn");
let temp=document.querySelector("#temp");
let feels=document.querySelector("#feels");
let city=document.querySelector("#city");
let humidity=document.querySelector("#humidity");
let wind=document.querySelector("#wind");
let cloude=document.querySelector("#cloud");
let sun=document.querySelector("#sun");
let visibility=document.querySelector("#visibility");
let pressure=document.querySelector("#pressure")
let condition=document.querySelector("#condition")
let state=document.querySelector("#state");
let dateE1=document.querySelector("#date");
let timeE1=document.querySelector("#time");
let tem1=document.querySelector("#tem1");
let condition1=document.querySelector("#condition1");
let tem2=document.querySelector("#tem2");
let condition2=document.querySelector("#condition2");
let tem3=document.querySelector("#tem3");
let condition3=document.querySelector("#condition3");
let msg=document.querySelector("#msg");
let darkmode=document.querySelector("#darkmode");
let loader = document.querySelector("#loader");

 function displayweather(data){
    
  console.log("displayweather running");
    city.innerText=data.location.name;
    
    temp.innerText=data.current.temp_c+ "°C";

    feels.innerText="🌡️ feels like " +data.current.feelslike_c+ "°c\n";

    humidity.innerText=  data.current.humidity + "%";

    wind.innerText= data.current.wind_kph + " km/h";

    cloude.innerText=data.current.cloud +"%";

    sun.innerText= data.current.uv+"hrs";

    visibility.innerText=data.current.vis_km +"km\n";

    pressure.innerText=data.current.pressure_mb +"hpa\n";

    condition.innerText=data.current.condition.text;

    state.innerText=data.location.region+ ","+ data.location.country

    // date acces ans day acces 
    let localtime = data.location.localtime;

    let parts = localtime.split(" ");
    
    // day assces 
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    let day= new Date(parts[0])
    let daynumber=day.getDay();//return index

    dateE1.innerText= days[daynumber]+" "+parts[0];

// time acces  
     timeE1.innerText=parts[1];

// 3-days forecast
// console.log(data.forecast);
// console.log(data.forecast.forecastday);
// console.log(data.forecast.forecastday[1]);

    tem1.innerText=data.forecast.forecastday[0].day.mintemp_c+"°/" + data.forecast.forecastday[0].day.maxtemp_c+"°"

    condition1.innerText=data.forecast.forecastday[0].day.condition.text;

    tem2.innerText=data.forecast.forecastday[1].day.mintemp_c+"°/" + data.forecast.forecastday[1].day.maxtemp_c+"°"

    condition2.innerText=data.forecast.forecastday[1].day.condition.text;

    tem3.innerText=data.forecast.forecastday[2].day.mintemp_c+"°/" + data.forecast.forecastday[2].day.maxtemp_c+"°"

    condition3.innerText=data.forecast.forecastday[2].day.condition.text;

 
}

input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){
        search.click();
    }

});

search.onclick=async function() {
    let cities=input.value;
    
    // let url=`https://wttr.in/${cities}?format=j1`

    // let url=`http://api.weatherapi.com/v1/current.json?key=9d1aeff0311d44b189f184913262106&q=${cities}&aqi=yes`
    

    let url=`http://api.weatherapi.com/v1/forecast.json?key=9d1aeff0311d44b189f184913262106&q=${cities}&days=3&aqi=yes&alerts=yes`

try{

    loader.style.display = "block";
    let responcse= await fetch(url); 
    let data=await responcse.json();
    console.log(data);

     let apiCity = data.location.name;

        // Check if city matches
         if(data.error){
            msg.innerText = "City not found";
            return;
        }
        displayweather(data);
 
        loader.style.display = "none";

    input.value="";
 
 
}catch(error){
      loader.style.display = "none";
    console.log(error);
   msg.innerText="somthing went wrong";
}

}
// assce of dark mode 
 darkmode.onclick=function(){
        document.body.classList.toggle("dark");
    }
 

// location acces code 

let locationbtn=document.querySelector("#location-btn");
  
async function success(position) {

     loader.style.display = "block";
    console.log(position)
  try{ let lat=position.coords.latitude;
   let long=position.coords.longitude;
//    console.log(lat,long)
   let locationouery=lat+","+long;
    console.log(locationouery);
    
     let url=`http://api.weatherapi.com/v1/forecast.json?key=9d1aeff0311d44b189f184913262106&q=${locationouery}&days=3&aqi=yes&alerts=yes`

      let responcse= await fetch(url);
    let data=await responcse.json();
    console.log(data)
displayweather(data);
  } catch (error){
console.log("success erroe:",error);
  }finally {

        loader.style.display = "none";

    }
  

} 



async function fail(position) {
    console.log(position);
}

locationbtn.onclick=async function () {
    await navigator.geolocation.getCurrentPosition(success,fail)
}


// this is for geting location whet page is open 
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(
        success,
        fail
    );
}

window.onload = function () {
    getLocationWeather();
}


console.log(temp);
console.log(city);
console.log(dateE1);