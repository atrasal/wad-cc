function getWeather(){
    let city = document.getElementById("city").value;
    fetch("data.json")
    .then(response =>response.json())
    .then(data =>{
        let result = document.getElementById("result");

        if(data[city]){
            result.innerHTML= `
                <h3>${city}</h3>
                <p>Temperature: ${data[city].temperature}°C</p>
                <p>Condition: ${data[city].condition}</p>
                <p>Humidity: ${data[city].humidity}%</p>
                <p>Wind Speed: ${data[city].wind_speed} km/h</p>
            `
        } else{
            result.innerHTML = "City not found in data.";
        }
    });
}