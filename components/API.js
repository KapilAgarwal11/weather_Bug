const API_KEY = '32b0871ef9af423fa34130022242301';
export const getWeatherData = async (latitude, longitude, isCelsius, setInfo, setForecast) => {
    try {
        const unit = isCelsius ? "c" : "f";
        const response = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=no&alerts=no`
        );
        const results = await response.json();

        setInfo({
            name: results.location.name,
            region: results.location.region,
            country: results.location.country,
            temp: isCelsius ? `${results.current.temp_c} °C` : `${results.current.temp_f} °F`,
            humidity: results.current.humidity + "%",
            desc: results.current.condition.text,
            icon: results.current.condition.icon,
            pressure: results.current.pressure_mb + " hPa",
            precipitation: results.current.precip_mm + " mm",
            Wind_Speed: results.current.wind_kph + " km/h",
        });

        setForecast(results.forecast.forecastday);
    } catch (error) {
        alert('Error fetching weather data. Please try again later.');
    }
};

export const fetchCities = (text, setCity, setCities) => {
    setCity(text);
    fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${text}`)
        .then((response) => response.json())
        .then((cityData) => {
            setCities(cityData);
        })
        .catch((error) => {
            console.error("Error fetching cities:", error);
        });
};

export const fetchWeatherData = async (selectedCity, setWeatherData) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}&aqi=no`);
        const results = await response.json();
        console.log('Weather API Response:', results);

        const newWeatherData = {
            name: results.location.name,
            region: results.location.region,
            country: results.location.country,
            temp: results.current.temp_c + " °C",
            humidity: results.current.humidity + "%",
            desc: results.current.condition.text,
            icon: results.current.condition.icon,
            pressure: results.current.pressure_mb + " hPa",
            precipitation: results.current.precip_mm + " mm",
            Wind_Speed: results.current.wind_kph + " km/h"
        };

        setWeatherData(newWeatherData);


    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};