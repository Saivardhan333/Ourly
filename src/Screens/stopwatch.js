import React, {useState, useRef} from 'react';
import {View, Button} from 'react-native';
import Stopwatch from 'react-native-stopwatch-timer';

const Stopwatch = () => {
  const stopwatchRef = useRef();
  const [time, setTime] = useState(0);
  const [stopwatchStart, setStopwatchStart] = useState(false);

  const handleStartStopwatch = () => {
    // Set the stopwatch time to the current time state
    stopwatchRef.current.setTime(time);
    // Start the stopwatch
    setStopwatchStart(true);
  };

  const handleResetStopwatch = () => {
    // Reset the stopwatch to 0
    stopwatchRef.current.reset();
    // Set the time state to 0
    setTime(0);
    // Stop the stopwatch
    setStopwatchStart(false);
  };

  const handleAddMinute = () => {
    // Add 1 minute (60 seconds) to the current time
    const newTime = time + 60;
    // Set the new time state
    setTime(newTime);
    // Set the stopwatch time to the new time
    stopwatchRef.current.setTime(newTime);
  };

  return (
    <View>
      <Stopwatch
        ref={stopwatchRef}
        laps
        msecs
        start={stopwatchStart}
        reset={false}
        getTimeToShow={time => getFormattedTime(time)}
        updateTime={time => setTime(time)}
      />
      <Button title="Start Stopwatch" onPress={handleStartStopwatch} />
      <Button title="Reset Stopwatch" onPress={handleResetStopwatch} />
      <Button title="Add 1 Minute" onPress={handleAddMinute} />
    </View>
  );
};

export default Stopwatch;
