import { useEffect, useRef, useState } from "react";

function Timer({ play }) {
  const [time, setTime] = useState({
    sec: 0,
    min: 0,
    hr: 0,
  });
  const [intervalId, setIntervalId] = useState();
  const intervalIdRef = useRef(intervalId);

  function updateTimer() {
    setTime((prev) => {
      let newTime = { ...prev };
      if (newTime.sec < 59) newTime.sec += 1;
      else {
        newTime.min += 1;
        newTime.sec = 0;
      }
      if (newTime.min === 60) {
        newTime.min = 0;
        newTime.hr += 1;
      }

      return newTime;
    });
  }

  useEffect(() => {
    if (play) start();
    else reset();
  }, [play]);

  function start() {
    if (!intervalId && !intervalIdRef.current) {
      let id = setInterval(updateTimer, 1000);
      console.log(intervalId);
      setIntervalId(id);
      intervalIdRef.current = id;
    } else {
      console.log(intervalId);
      clearInterval(intervalId);
      setIntervalId("");
    }
  }

  function reset() {
    clearInterval(intervalId);
    setTime({
      sec: 0,
      min: 0,
      hr: 0,
    });
  }

  return (
    <div
      className="flex justify-center items-center gap-1 text-white text-xl"
      onClick={start}
    >
      <span>
        {time.hr < 10 ? 0 : ""}
        {time.hr}
      </span>
      <span>:</span>
      <span>
        {time.min < 10 ? 0 : ""}
        {time.min}
      </span>
      <span>:</span>

      <span>
        {time.sec < 10 ? 0 : ""}
        {time.sec}
      </span>
    </div>
  );
}

export default Timer;
