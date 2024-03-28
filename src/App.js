import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const drumPadsData = [
  { id: 'Q', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', label: 'Heater 1' },
  { id: 'W', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', label: 'Heater 2' },
  { id: 'E', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', label: 'Heater 3' },
  { id: 'A', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', label: 'Heater 4' },
  { id: 'S', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', label: 'Clap' },
  { id: 'D', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', label: 'Open-HH' },
  { id: 'Z', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', label: 'Kick-n\'-Hat' },
  { id: 'X', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', label: 'Kick' },
  { id: 'C', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', label: 'Closed-HH' }
];

const DrumPad = ({ id, audioSrc, label, activeKey, setActiveKey }) => {
  const playAudio = useCallback(() => {
    const audio = document.getElementById(id);
    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
      setActiveKey(label);
    } else {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
      setActiveKey(label);
    }
  }, [id, label, setActiveKey]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toUpperCase() === id) {
        playAudio();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [id, label, playAudio]);

  const handleClick = () => {
    playAudio();
  };

  return (
    <div className="drum-pad" id={`drum-${id}`} onClick={handleClick}>
      {id}
      <audio className="clip" id={id} src={audioSrc} />
    </div>
  );
};

const App = () => {
  const [activeKey, setActiveKey] = useState('');

  return (
    <div className="App" id="drum-machine">
      <div id="display">{activeKey}</div>
      {drumPadsData.map(pad => (
        <DrumPad 
          key={pad.id} 
          id={pad.id} 
          audioSrc={pad.audioSrc} 
          label={pad.label} 
          activeKey={activeKey} 
          setActiveKey={setActiveKey} 
        />
      ))}
    </div>
  );
};

export default App;
