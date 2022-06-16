import './App.css';
import Timer from './Timer';
import Settings from './Settings';
import {useState} from 'react';
import settingscontext from './settingscontext';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workminutes, setWorkMinutes] = useState(25);
  const [breakminutes, setBreakMinutes] = useState(5);
  return (
    <main>
      <settingscontext.Provider value={{
        showSettings,
        setShowSettings,
        workminutes,
        breakminutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
      {showSettings ? <Settings /> : <Timer />}
      </settingscontext.Provider>
    </main>
  );
}

export default App;
