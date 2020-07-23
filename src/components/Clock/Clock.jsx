import React, { useState, useEffect } from "react";
import "./Clock.css";

import { localToEorzea, formatTime } from "../../utils";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [et, setET] = useState(localToEorzea(new Date()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
      setET(localToEorzea(new Date()));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className="clock">
      <div className="display">
        <div>{`${formatTime(time)}`}</div>
        <div className="et-clock">{`${formatTime(et)}`}</div>
      </div>
    </div>
  );
};

export default Clock;
