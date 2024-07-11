import React, { useState, useEffect } from 'react';
import './Clock.css'; // Import file for Clock component styles
import useSound from 'use-sound';


const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [alarmHour, setAlarmHour] = useState('');
  const [alarmMinute, setAlarmMinute] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);

  const [playAlarm] = useSound(alarmSound);

  useEffect(() => {
    const intervalID = setInterval(() => tick(), 1000);

    checkAlarm(time);

    return () => {
      clearInterval(intervalID);
    };
  }, [time]);

  const tick = () => {
    setTime(new Date());
  };

  const handleSetAlarm = () => {
    if (alarmHour !== '' && alarmMinute !== '') {
      setAlarmSet(true);
      alert(`Báo thức đã được thiết lập vào ${alarmHour}:${alarmMinute}`);
    } else {
      alert('Vui lòng nhập giờ và phút cho báo thức');
    }
  };

  const checkAlarm = (currentTime) => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (
      alarmSet &&
      currentHour.toString() === alarmHour &&
      currentMinute.toString() === alarmMinute
    ) {
      handleAlarmTrigger();
    }
  };

  const handleAlarmTrigger = () => {
    // Play alarm sound when alarm triggers
    playAlarm();
    alert('Báo thức đã kích hoạt!');
  };

  return (
    <div className="clock">
      <h1 className="clock-heading">Đồng hồ</h1>
      <div className="clock-display">
        <p className="clock-time">
          {time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </p>
      </div>
      <div className="alarm-form">
        <input
          type="number"
          placeholder="Giờ"
          min="0"
          max="23"
          value={alarmHour}
          onChange={(e) => setAlarmHour(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phút"
          min="0"
          max="59"
          value={alarmMinute}
          onChange={(e) => setAlarmMinute(e.target.value)}
        />
        <button onClick={handleSetAlarm}>Thiết lập báo thức</button>
      </div>
    </div>
  );
};

export default Clock;
