import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Stopwatch(props) {
  const [running, setRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  let interval = null;

  useEffect(() => {
    interval = setInterval(() => onTick(), 100);

    return () => {
      clearInterval(interval);
    };
  });

  const onStart = () => {
    setRunning(true);
    setStartTime(Date.now());
  };

  const onStop = () => {
    setRunning(false);
  };

  const onReset = () => {
    setElapsedTime(0);
    setStartTime(Date.now());
  };

  const onTick = () => {
    if(running) {
      setElapsedTime(Date.now() - startTime);
    }
  };

  const stopButton = <button onClick={() => onStop()}>Stop</button>;
  const startButton = <button onClick={() => onStart()}>Start</button>;
  const seconds = Math.floor(elapsedTime / 1000);

  return(
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <div className="stopwatch-time">{seconds}</div>
      {running ?  stopButton : startButton }
      <button onClick={() => onReset()}>Reset</button>
    </div>
  );
}

export default Stopwatch;
