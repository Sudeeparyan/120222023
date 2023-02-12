import changeToFarenheit from "./export.js";


var weather_data;
(function(){
    fetch ("data.json")
    .then ((data)=>data.json())
    .then((result)=>{
        weather_data=result;
        console.log(weather_data);
        setWeather();
    })
})();

function setWeather(){
    let city=Object.keys(weather_data);
    console.log("city");
    console.log(city);
    let option=``;
    for(let i=0;i<city.length;i++){
        option+=`<option>${weather_data[city[i]].cityName}</option>`;
    }
    document.getElementById("data_dropdown").innerHTML=option;
}

document.querySelector("#inputdata").addEventListener("change",callChange);

function callChange(){
    let city =Object.keys(weather_data);
    let selectedCity=document.querySelector("#inputdata").value.toLowerCase();
    let currentcity=selectedCity;
    let flag=0;
    for(let i=0;i<city.length;i++){
        if(currentcity==city[i]){
            change();
            flag=1;
        }
    }
    if(flag==0){
        ErrorCity();
    }
}

function ErrorCity(){
    document.querySelector("#top-tempc").innerHTML="-";
    document.getElementById("top-humidity").innerHTML="-";
    document.querySelector("#top-time").innerText="Enter a Valid Time"
    document.querySelector("#top-time").style.color="red";
    for(let i=0;i<6;i++){
        document.querySelector(`#time-${i}`).innerText="-";
    }
}

function change(){
    console.log("change");
    let dropdown=document.querySelector("#inputdata").value.toLowerCase();
    document.getElementById("top-tempc").innerHTML=weather_data[dropdown].temperature;
    document.getElementById("top-humidity").innerHTML=weather_data[dropdown].humidity;
    document.querySelector("#top-img").src=`HTML & CSS/Icons for cities/${dropdown}.svg`;
    
    let cel=parseInt(weather_data[dropdown].temperature);
    let far=changeToFarenheit(cel).toFixed(0)+"F";
    document.querySelector("#top-far").innerHTML=far;
    let datetime
    datetime=weather_data[dropdown].dateAndTime.split(",");
    document.getElementById("top-date").innerHTML=datetime[0];
    document.querySelector("#top-time").innerHTML=datetime[1];
    let montharr=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let datesplit=datetime[0];
    let datearr=datesplit.split("/");
    let dateinwords=datearr[1].padStart(2,"0")+"-"+montharr[datearr[0]-1]+"-"+datearr[2];
    document.getElementById("top-date").innerHTML=dateinwords;


    let sixtemp=[parseInt(weather_data[`${dropdown}`].temperature),
                parseInt(weather_data[`${dropdown}`].temperature)]
    for(let i=0;i<6;i++){
        sixtemp[i+2]=parseInt(weather_data[`${dropdown}`].nextFiveHrs[i]);
    }
    for(let i=0;i<6;i++){
        document.querySelector(`#temperature-${i+1}`).innerHTML=sixtemp[i]
    }
    for(let i=0;i<6;i++){
        if(sixtemp[i]<0){
            document.querySelector(`#icon-${i+1}`).src="HTML & CSS/Weather Icons/snowflakeIcon.svg"
        }else if(sixtemp[i]<18&&sixtemp[i]>0){
            document.querySelector(`#icon-${i+1}`).src=""
        }
    }
}


