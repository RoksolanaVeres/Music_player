import { useState, useRef } from "react";
import classes from "./MusicPlayer.module.css";
import formatTime from "./utils/formatTime";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import songs from "./data";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const myPlaylist = songs;
  const currentSong = myPlaylist[currentSongIndex];

  const audioRef = useRef(null);
  const rangeBarRef = useRef(null);
  const playAnimationRef = useRef(null);

  function onLoadedMetadata() {
    const durationInSeconds = audioRef.current.duration;
    setDuration(durationInSeconds);
    rangeBarRef.current.max = durationInSeconds;
  }

  function handleRangeChange(e) {
    const newTime = e.target.value;
    setTimeProgress(newTime);
    audioRef.current.currentTime = newTime;
  }

  function repeat() {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);

    rangeBarRef.current.style.setProperty(
      "--range-progress",
      `${(rangeBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }

  function togglePlayPause() {
    const isCurrentlyPlaying = isPlaying;
    if (isCurrentlyPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    } else {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
    setIsPlaying(!isPlaying);
  }

  function handlePrevClick() {
    setCurrentSongIndex((prevIndex) => prevIndex - 1);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }

  function handleNextClick() {
    setCurrentSongIndex((prevIndex) => prevIndex + 1);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }

  return (
    <div className={classes.musicPlayer__container}>
      <audio ref={audioRef} onLoadedMetadata={onLoadedMetadata}>
        <source src={currentSong.audio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className={classes.title__container}>
        <h2>{currentSong.title}</h2>
        <h3>{currentSong.singer}</h3>
      </div>

      <div>
        <input
          type="range"
          value={timeProgress}
          onChange={handleRangeChange}
          ref={rangeBarRef}
          className={classes.rangeBar}
        />
      </div>
      <div className={classes.musicTime__container}>
        <div>{formatTime(timeProgress)}</div>
        <div>{formatTime(duration)}</div>
      </div>

      <div className={classes.musicButtons__container}>
        <button onClick={handlePrevClick} className={classes.controlButton}>
          <TbPlayerTrackPrevFilled />
        </button>
        <button
          onClick={togglePlayPause}
          className={`${classes.controlButton} ${classes.playButton}`}
        >
          {isPlaying ? <TbPlayerPauseFilled /> : <TbPlayerPlayFilled />}
        </button>
        <button onClick={handleNextClick} className={classes.controlButton}>
          <TbPlayerTrackNextFilled />
        </button>
      </div>
    </div>
  );
}
