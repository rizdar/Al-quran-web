import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaDownload } from 'react-icons/fa';
import styled from 'styled-components';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioRef.current.src;
    link.download = { src };
    link.click();
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  let progress = (currentTime / duration) * 100;
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <AudioPlayerContainer>
      <audio src={src} onTimeUpdate={handleTimeUpdate} onLoadedData={handleTimeUpdate} ref={audioRef} onEnded={handleAudioEnded} />
      <ControlButton onClick={handlePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</ControlButton>
      <ProgressBarContainer>
        <ProgressBar progress={progress} />
      </ProgressBarContainer>
      <ControlButton onClick={handleDownload}>
        <FaDownload />
      </ControlButton>
    </AudioPlayerContainer>
  );
};
export default AudioPlayer;

const AudioPlayerContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 640px) {
    margin-bottom: 2rem;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  background-color: #ccc;
  position: relative;
`;
const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 5px;
  background-color: #333;
  position: absolute;
  top: 0;
  left: 0;
`;
const ControlButton = styled.button`
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const DownloadButton = styled.a`
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
`;
