import React, { useState, useEffect, useRef } from "react";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbRepeat,
  TbVolume,
} from "react-icons/tb";

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
            <h3 className="text-xs md:text-sm lg:text-base xl:text-lg">{currentSong.title}</h3>
            <p>Artist</p>
          </div>
        )}
      </div>
      {/* CENTER */}
      <div className="flex items-center justify-evenly">
        <TbPlayerTrackPrevFilled className="button" />
        {isPlaying ? (
          <TbPlayerStopFilled className="button" onClick={handlePlayPause} />
        ) : (
          <TbPlayerPlayFilled className="button" onClick={handlePlayPause} />
        )}
        <TbPlayerTrackNextFilled className="button" />
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
