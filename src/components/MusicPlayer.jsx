import React, { useState, useEffect, useRef } from "react";
import {
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbRepeat,
  TbVolume,
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
  TbReload,
} from "react-icons/tb";

import {MdPlayCircle} from "react-icons/md";

function MusicPlayer({ currentSong, isPlaying, onPlayPause }) {
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (!audioReady) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    // Cambiar el estado de reproducción aquí
    onPlayPause(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (isPlaying && audioReady) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  }, [currentSong, isPlaying, audioReady]);

  const handleCanPlayThrough = () => {
    setAudioReady(true);
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  return (
    <div className="h-20 bg-gradient-to-b from-black to-slate-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-transparent animate-slideup">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 hidden md:inline"
          src="/assets/glist logo.jpeg"
          alt=""
        />
        {currentSong && (
          <div>
            <h3 className="text-xs md:text-sm lg:text-base xl:text-lg w-48 lg:w-full">
              {currentSong.title}
            </h3>
            <p>Artist</p>
          </div>
        )}
      </div>
      {/* CENTER */}
      <div className="flex items-center justify-end space-x-10">
        <TbReload className="button" />
        <TbPlayerTrackPrevFilled className="button"/>
        {isPlaying ? (
          <TbPlayerPauseFilled className="h-7 w-7 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" onClick={handlePlayPause} />
        ) : (
          <MdPlayCircle className="h-7 w-7 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" onClick={handlePlayPause} />
        )}
        <TbPlayerTrackNextFilled className="button"/>
        <TbRepeat className="button" />
      </div>
      {/* RIGHT */}
      <div className="flex items-center justify-end mr-5">
        <TbVolume className="button" />
      </div>

      {/* Audio element para reproducir la canción */}
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onCanPlayThrough={handleCanPlayThrough}
        />
      )}
    </div>
  );
}

export default MusicPlayer;
