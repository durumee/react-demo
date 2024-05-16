import { useEffect, useState } from "react";

const Clock = () => {
  const [clock, setClock] = useState("");
  function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setClock(`${hours}:${minutes}:${seconds}`);
  }
  useEffect(() => {
    setInterval(getClock, 1000);
  }, []);

  return <h2 id="clock">{clock}</h2>;
};

export default Clock;
