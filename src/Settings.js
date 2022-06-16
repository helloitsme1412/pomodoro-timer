import { useContext } from "react";
import ReactSlider from "react-slider";
import "./slider.css";
import settingscontext from "./settingscontext";
import Backbutton from "./BackButton";
function Settings() {
    const settingsInfo = useContext(settingscontext);
    return (
        <div style={{ textAlign: 'left' }}>
            <label>work minutes: {settingsInfo.workminutes}:00</label>
            <ReactSlider
                className={'Slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workminutes}
                onChange = {newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />

            <label>break minutes: {settingsInfo.breakminutes}:00</label>

            <ReactSlider
                className={'Slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakminutes}
                onChange = {newValue => settingsInfo.setBreakMinutes(newValue)}
                min={1}
                max={120}
            />
            <div style={{
                textAlign:'center',
                marginTop:'20px',
            }}>
            <Backbutton onClick={()=>settingsInfo.setShowSettings(false)} />
            </div>
        </div>
    )
}
export default Settings;