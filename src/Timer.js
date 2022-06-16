import { CircularProgressbar, bulidstyles, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Playbutton from './Playbutton';
import Pausebutton from './Pausebutton';
import {useContext, useState, useEffect, useRef} from "react";
import Settingsbutton from './Settingsbutton';
import settingscontext from './settingscontext';

const red ='#f54e4e';
const green = '#4aec8c';

function Timer(){
    const settingsInfo = useContext(settingscontext);
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode(){
        const nextMode = (modeRef.current === 'work' ? 'break' : 'work');
        const nextSeconds = (nextMode ==='work'? settingsInfo.workminutes : settingsInfo.breakminutes) * 60;
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }
    
    function tick(){
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current)
    }

    function initTimer(){
        setSecondsLeft(settingsInfo.workminutes * 60);
    }

    useEffect(() => {
        initTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current){
                return;
            }
            if (secondsLeftRef.current === 0){
                switchMode();
            }
            tick();
        }, 1000);
        return ()=> clearInterval(interval);
    }, [settingsInfo])
    
    const totalSeconds = mode === 'work' ? settingsInfo.workminutes * 60 : settingsInfo.breakminutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft/60); //if 44.8 we want 44 mins
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return(
        <div>
            <CircularProgressbar value={percentage} text={minutes + ':' + seconds} styles={buildStyles({
                textColor: '#fff',
                pathColor:mode === 'work'? red : green,
                trailColor:'rgba(255,255,255,0.2)',
            })} />
            <div style={{marginTop:'20px'}}>
                {isPaused ? <Playbutton onClick={()=>{setIsPaused(false); isPausedRef.current = false}} />: 
                <Pausebutton onClick={()=>{setIsPaused(true); isPausedRef.current = true}} />
                }
            </div>
            <div style={{marginTop:'20px'}}>
                <Settingsbutton onClick={() => settingsInfo.setShowSettings(true)}/>
            </div>
        </div>
    )
}
export default Timer;