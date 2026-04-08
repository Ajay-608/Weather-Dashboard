const apiKey = "981a5555c09208e590a8979f7a934812";

document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = document.getElementById('cityInput').value.trim();
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.textContent = "Loading...";

    if (!city) {
        weatherResult.textContent = "Please enter a city name.";
        return;
    }
 
    try {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiURL);

        if (!response.ok) {
            weatherResult.textContent = "City not found. Please try again.";
            return;
        }

        const data = await response.json();
        function changeBackground(weather){
                if (weather === "Clear") {
                document.body.style.backgroundImage = "url('images/sunny.png')";
                } else if (weather === "Clouds") {
                        document.body.style.backgroundImage = "url('images/cloudy.png')";
                } else if (weather === "Rain") {
                       document.body.style.backgroundImage = "url('images/rain.png')";
              }
          }
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p><strong>Temperature:</strong> ${data.main.temp} &deg;C</p>
            <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            
        `;
        } catch (error) {
        weatherResult.textContent = "Error fetching weather data. Please try again.";
    }
});
