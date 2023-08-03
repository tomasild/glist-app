import React, { useState } from "react";
import {
  TbSwitch2,
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbRepeat,
  TbVolume,
  TbVolumeOff,
  TbVolume2,
} from "react-icons/tb";

function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Función para manejar la reproducción o pausa de la canción
  const handlePlayPause = (songData) => {
    if (currentSong && currentSong.audioUrl === songData.audioUrl) {
      // Si la misma canción se está reproduciendo, cambiamos el estado de reproducción
      setIsPlaying(!isPlaying);
    } else {
      // Si es una nueva canción, la establecemos como la canción actual y la reproducción inicia automáticamente
      setCurrentSong(songData);
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="h-24 bg-gradient-to-b from-black to-slate-900 
      grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-transparent"
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
        <TbSwitch2 className="button" />
        <TbPlayerTrackPrevFilled className="button" />
        {isPlaying ? (
          <TbPlayerStopFilled
            className="button"
            onClick={() => handlePlayPause(currentSong)}
          />
        ) : (
          <TbPlayerPlayFilled
            className="button"
            onClick={() => handlePlayPause(currentSong)}
          />
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