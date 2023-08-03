import React, { useState, useEffect } from "react";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbRepeat,
  TbVolume,
} from "react-icons/tb";

function MusicPlayer({ currentSong, isPlaying, onPlayPause }) {
  return (
    <div
      className="h-20 bg-gradient-to-b from-black to-slate-900 
      grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-transparent animate-slideup"
    >
      {/* LEFT  */}
      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 hidden md:inline"
          src="/assets/glist logo.jpeg"
          alt=""
        />
        {currentSong && (
          <div>
            <h3>{currentSong.title}</h3>
            <p>Artist</p>
          </div>
        )}
      </div>
      {/* CENTER  */}
      <div className="flex items-center justify-evenly">
        <TbPlayerTrackPrevFilled className="button" />
        {isPlaying ? (
          <TbPlayerStopFilled className="button" onClick={onPlayPause} />
        ) : (
          <TbPlayerPlayFilled className="button" onClick={onPlayPause} />
        )}
        <TbPlayerTrackNextFilled className="button" />
        <TbRepeat className="button" />
      </div>
      {/* RIGHT  */}
      <div className="flex items-center justify-end mr-5">
        <TbVolume className="button" />
      </div>

      {/* Audio element para reproducir la canción */}
      {currentSong && (
        <audio
          ref={(audio) => {
            if (audio) {
              audio.src = currentSong.audioUrl;
              if (isPlaying) audio.play();
              else audio.pause();
            }
          }}
          style={{ display: isPlaying ? "block" : "none" }}
        />
      )}
    </div>
  );
}

export default MusicPlayer;
