import {
  MonitorPlay,
  Pause,
  Play,
  Rows2,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import { useAuth } from "../context/UseAuth.tsx";
import { useSong } from "../context/UseSong.tsx";

export const ControlMusic = () => {
  const {
    song,
    showDetailHandler,
    showDetail,
    handlePlay,
    isPaused,
    audioRef,
    dequeue,
    advertise,
    resetAdv,
    closeAdvertise,
  } = useSong();
  const { user } = useAuth();

  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? parseInt(savedVolume) : 80;
  });

  const [currentTime, setCurrentTime] = useState(() => {
    const savedDuration = localStorage.getItem("duration");
    return audioRef.current
      ? audioRef.current.currentTime
      : savedDuration
        ? parseFloat(savedDuration)
        : 0;
  });

  useEffect(() => {
    if (!audioRef.current) return;

    const handleLoadedMetadata = () => {
      const songAudio = audioRef.current;
      if (!songAudio) return;

      const savedDuration = localStorage.getItem("duration");
      if (savedDuration) {
        songAudio.currentTime = parseFloat(savedDuration);
        setCurrentTime(songAudio.currentTime);
      }
    };

    const updateCurrentTime = () => {
      const songAudio = audioRef.current;
      if (!songAudio) return;
      setCurrentTime(songAudio.currentTime);
      localStorage.setItem("duration", songAudio.currentTime.toString());
    };
    const handleEnded = () => {
      console.log("ended");
      // setCurrentTime(0);
      // localStorage.setItem("duration", "0");
      if (advertise != null) {
        closeAdvertise();
        resetAdv();
      }
      dequeue(user);
    };

    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("timeupdate", updateCurrentTime);
    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
      audioRef.current.removeEventListener("ended", handleEnded);
      audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [audioRef.current]);

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseInt(event.target.value);
    localStorage.setItem("volume", newVolume.toString());
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    if (advertise) return;
    audioRef.current.currentTime = parseFloat(event.target.value);
    localStorage.setItem("duration", audioRef.current.currentTime.toString());
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    if (audioRef.current == null) return;
    if (isPaused) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = currentTime;
      audioRef.current.play().catch((error: unknown) => {
        console.log(error);
        return;
      });
    }
  }, [isPaused, audioRef.current]);

  return (
    <div className="musicControl">
      <div className="musicContent">
        <img
          src={
            advertise
              ? advertise.image
              : song
                ? song.album.banner
                : "/assets/download (6).png"
          }
          alt=""
        />
        <div>
          <h3>{advertise ? "Advertisement" : song?.title}</h3>
          <p>
            {advertise ? advertise.publisherName : song?.artist.user.username}
          </p>
        </div>
      </div>
      <div className="musicControlButton">
        <div className="button">
          <button>
            <SkipBack />
          </button>
          <button onClick={handlePlay}>
            {isPaused ? <Play /> : <Pause />}
          </button>
          <button
            onClick={() => {
              dequeue(user);
            }}
          >
            <SkipForward />
          </button>
        </div>
        <div className="duration">
          <p>
            {currentTime
              ? Math.floor(currentTime / 60)
                  .toString()
                  .padStart(2, "0")
              : "00"}
            :
            {currentTime
              ? Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, "0")
              : "00"}
          </p>
          <input
            type="range"
            min="0"
            max={song?.duration ?? 0}
            onChange={handleDurationChange}
            value={currentTime}
            className="slider"
            id="durationSlider"
          />
          <p>
            {song
              ? Math.floor(song.duration / 60)
                  .toString()
                  .padStart(2, "0")
              : "00"}
            :
            {song
              ? Math.floor(song.duration % 60)
                  .toString()
                  .padStart(2, "0")
              : "00"}
          </p>
        </div>
      </div>
      <div className="volumeControl">
        <div>
          <Rows2
            onClick={() => {
              if (advertise != null) return;
              showDetailHandler("queue");
            }}
            className={showDetail === "queue" ? "active" : ""}
          />
        </div>
        <div>
          <MonitorPlay
            onClick={() => {
              if (advertise != null) return;
              showDetailHandler("detail");
            }}
            className={showDetail === "detail" ? "active" : ""}
          />
        </div>
        <label htmlFor="volumeSlider">
          {volume === 0 ? <VolumeX /> : volume < 50 ? <Volume1 /> : <Volume2 />}
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
