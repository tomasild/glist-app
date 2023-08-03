import { FaPlay, FaPause } from 'react-icons/fa';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Song({ title, duration, _id, albumId, index, onPlay }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePlay = async () => {
    const audioElement = new Audio();
    
    if (!isPlaying) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/songs/${_id}/audio`,
          {
            responseType: "blob",
          }
        );
        const audioBlob = new Blob([response.data], { type: "audio/*" });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Set the audio source and play it
        audioElement.src = audioUrl;
        audioElement.play().catch(error => {
          console.error("Error playing audio:", error);
        });
        
        setIsPlaying(true);
        onPlay({ title, duration, audioUrl, albumId }); // Transmit the song data to the MusicPlayer component
      } catch (error) {
        console.error("Error obtaining audio file:", error);
      }
    } else {
      // Pause the audio and reset the audio source
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="grid grid-cols-2 px-4 py-2 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleHover}
      onTouchEnd={handleMouseLeave}
    >
      <div className="flex items-center space-x-4 p-1">
        <p className="font-bold">{index}</p>
        {isHovered ? (
          <button
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"
            onClick={handlePlay}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        ) : (
          <img src="/assets/glist logo nobg.png" className="w-10 h-10" />
        )}
        <div>
          <p className="w-36 lg:w-72 truncate">{title}</p>
          <p className="cursor-pointer">Artist</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <Link to={`/album/${albumId}`} className="cursor-pointer">
          <p className="cursor-pointer w-40 hidden md:inline">{albumId}</p>
        </Link>
        <p>{duration}</p>
      </div>
    </div>
  );
}

export default Song;
