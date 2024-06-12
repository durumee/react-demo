import { API_KEY } from "./secret.js";
import "./App.css";
import Clock from "./Clock";
import Weather from "./Weather";
import Area from "./Area";
import { useEffect, useState } from "react";
import MiniForecast from "./MiniForecast";

function App() {
  const temperatures = [25, 27, 27, 24, 21];
  const timeLabels = ['12', '14', '16', '18', '20'];
  const weatherIcons = ['S', 'C', 'C', 'R', 'R'];
  const [area, setArea] = useState({});
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        get(lat, lon);
      },
      (error) => {
        setError("위치 정보를 가져오는데 실패했습니다.");
      }
    );

    async function get(lat2, lon2) {
      try {
        const data = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&units=metric&appid=${API_KEY}`
        );

        const res = await data.json();
        console.log(res);
        if (!res.coord || !res.name || !res.weather || !res.main || !res.wind) {
          throw new Error("API 응답 데이터가 올바르지 않습니다.");
        }
        const lat = res.coord.lat;
        const lon = res.coord.lon;
        const name = res.name;
        setArea({ lat, lon, name });

        const icon = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
        const desc = res.weather[0].description;
        const temp = res.main.temp;
        const speed = res.wind.speed;
        const main = res.weather[0].main;
        setWeather({ icon, desc, temp, speed, main });
      } catch (error) {
        setError("날씨 정보를 가져오는데 실패했습니다.");
      }
    }
  }, []);
  return (
    <div className="App">
      <Clock />
      <MiniForecast
        temperatures={temperatures}
        timeLabels={timeLabels}
        weatherIcons={weatherIcons}
      />
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <Area data={area} />
          <Weather data={weather} />
        </>
      )}
    </div>
  );
}

export default App;
