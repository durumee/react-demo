const Area = (props) => {
  return (
    <h2 id="location">
      {props.data.name} / {props.data.lat} / {props.data.lon}
    </h2>
  );
};

export default Area;
