const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');
const updateUI=(data)=>{
    console.log(data);
     const city=data.cityDets;
     const weather=data.weather;
     details.innerHTML=`
                <h5 class="my-3">${city.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
                `;

    const iconsrc=`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconsrc);
    
    let timesrc= null;
    if(weather.IsDayTime){
        timesrc= 'img/day.svg';
    }
    else if(weather.IsDayTime==false){
        timesrc= 'img/night.svg';
    }
    time.setAttribute('src',timesrc);
    if(card.classList.contains('d-none')){
    card.classList.remove('d-none');
    }
    
};
const updateCity= async(city)=>{
    const cityDets= await getCity(city);
    const weather= await getWeather(cityDets.Key);
    return{
         cityDets, weather
    };
};
cityForm.addEventListener('submit',e=>{
    e.preventDefault();
    const city =cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city).then(data=>{
        updateUI(data);
    }).catch(err=>{
        console.log(err);
    });
});