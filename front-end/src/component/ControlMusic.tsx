import songImage from '../../public/assets/yume to hazakura.jpg';
import {
    MonitorPlay,
    Pause,
    Play,
    Rows2,
    SkipBack,
    SkipForward,
    Volume1,
    Volume2,
    VolumeX
} from "lucide-react";
import {ChangeEvent, useEffect, useState} from "react";

import {useSong} from "../context/UseSong.tsx";

export const ControlMusic = () => {
    const {song, showDetailHandler, showDetail,handlePlay,isPaused} = useSong();

    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('volume');
        return savedVolume ? parseInt(savedVolume) : 80;
    });

    const [currentTime, setCurrentTime] = useState(() => {
        const savedDuration = localStorage.getItem('duration');
        return savedDuration ? parseInt(savedDuration) : song.songAudio.currentTime;
    });

    useEffect(() => {
        song.songAudio.currentTime = currentTime;
        const updateCurrentTime = () => {
            setCurrentTime(song.songAudio.currentTime);
            localStorage.setItem('duration', song.songAudio.currentTime.toString());
        };

        const interval = setInterval(updateCurrentTime, 1000);

        return () => clearInterval(interval);
    }, [song.songAudio]);




    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(event.target.value);
        localStorage.setItem('volume', volume.toString());
        setVolume(newVolume);
        song.songAudio.volume = newVolume / 100;
    };

    const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
        song.songAudio.currentTime = parseInt(event.target.value);
        localStorage.setItem('duration', song.songAudio.currentTime.toString());
        setCurrentTime(song.songAudio.currentTime);
    };



    return (
        <div className="musicControl">
            <div className="musicContent">
                <img src={songImage} alt="" />
                <div>
                    <h3>{song.title}</h3>
                    <p>{song.user?.username}</p>
                </div>
            </div>
            <div className="musicControlButton">
                <div className="button">
                    <button onClick={() => song.songAudio.currentTime -= 5}><SkipBack/></button>
                    <button onClick={handlePlay}>{isPaused ? <Play/> : <Pause/>}</button>
                    <button onClick={() => (song.songAudio.currentTime = 0) && song.songAudio.pause()}><SkipForward/></button>
                </div>
                <div className="duration">
                    <p>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</p>
                    <input
                        type="range"
                        min="0"
                        max={song.songAudio.duration}
                        onChange={handleDurationChange}
                        value={currentTime}
                        className="slider"
                        id="durationSlider"
                    />
                    <p>{Math.floor(song.songAudio.duration / 60)}:{Math.floor(song.songAudio.duration % 60).toString().padStart(2, '0')}</p>
                </div>
            </div>
            <div className="volumeControl">
                <div>
                    <Rows2 onClick={() => showDetailHandler("queue")} className={`${showDetail === "queue" ? "active" : ""}`}/>
                </div>
                <div>
                    <MonitorPlay onClick={() => showDetailHandler("detail")} className={`${showDetail === "detail" ? "active" : ""}`}/>
                </div>
                <label htmlFor="volumeSlider">
                    {volume === 0 ? <VolumeX/> : volume < 50 ? <Volume1/> : <Volume2/>}
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    onChange={handleVolumeChange}
                    value={volume}
                    className="slider"
                    id="volumeSlider"
                />
            </div>
        </div>
    );
};
