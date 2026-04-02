import { useState, useEffect, useRef } from 'react'

import Temp from './components/Temp'
import Time from './components/Time'
import Details from './components/Details'
import Future from './components/Future'

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ city: '', state: '', country: '' });
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  async function fetchWeather(lat, lon) {
    // Open-Meteo: free, no API key, no rate limits
    const url = `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,` +
      `dew_point_2m,weather_code,wind_speed_10m,uv_index,visibility,surface_pressure` +
      `&hourly=temperature_2m` +
      `&timezone=auto&forecast_days=1`;

    console.log('Weather URL:', url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
    const json = await res.json();
    console.log('Weather data:', json);

    const c = json.current;

    // Hourly temps: morning=6AM(idx 6), afternoon=12PM(idx 12), evening=6PM(idx 18)
    const hourly = json.hourly?.temperature_2m ?? [];

    setWeather({
      temperature:  c.temperature_2m,
      feelsLike:    c.apparent_temperature,
      humidity:     c.relative_humidity_2m,
      dewPoint:     c.dew_point_2m,
      weatherCode:  c.weather_code,
      windSpeed:    c.wind_speed_10m,
      uvIndex:      c.uv_index,
      visibility:   c.visibility / 1000,   // metres → km
      pressure:     c.surface_pressure,     // hPa
      morning:      hourly[6],
      afternoon:    hourly[12],
      evening:      hourly[18],
    });
    setError(null);
  }

  function gps() {
    hasFetched.current = false; // allow re-fetch when user presses "Change Location"
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Reverse-geocode lat/lon → city name for display
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const geoData = await geoRes.json();
        const addr = geoData.address;

        const city    = addr.city || addr.town || addr.village || addr.county;
        const state   = addr.state_code || addr.state;
        const country = addr.country;

        setLocation({ city, state, country });
        console.log('Location:', `${city}, ${state}, ${country}`);

        await fetchWeather(lat, lon);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError('Could not get your location. Please allow location access.');
      }
    );
  }

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    gps();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-10 justify-between w-full">

      {error && (
        <div className="text-red-400 text-center p-4 bg-red-900/30 rounded mx-6 mt-4">
          {error}
        </div>
      )}

      <div className="top flex justify-between p-6">
        <Temp
          temperature={weather?.temperature}
          feelsLike={weather?.feelsLike}
          condition={weather?.weatherCode}
          city={location.city}
          state={location.state}
          country={location.country}
          onChangeLocation={gps}
        />
        <Time />
      </div>

      <div className="buttom flex w-full h-80">
        <Details
          humidity={weather?.humidity}
          visibility={weather?.visibility}
          uvIndex={weather?.uvIndex}
          windSpeed={weather?.windSpeed}
          dewPoint={weather?.dewPoint}
          pressure={weather?.pressure}
        />
        <Future
          morning={weather?.morning}
          afternoon={weather?.afternoon}
          evening={weather?.evening}
        />
      </div>

    </div>
  )
}

export default App
