const Weather = ({ data }) => {
  return (
    <div id="weather">
      <span>{data.main}</span>
      <span>
        <img src={data.icon} title={data.desc} alt={data.desc} />
      </span>
      <span>{data.temp && data.temp.toFixed(1)}℃`</span>
      <span>{data.speed}m/s</span>
    </div>
  );
};

export default Weather;
