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
import { MdPlayCircle } from "react-icons/md";

// Componente de reproductor de música
function MusicPlayer({ currentSong, onPlayPause }) {
  // Estado local para rastrear si el audio está listo para reproducirse
  const [audioReady, setAudioReady] = useState(false);

  // Referencia al elemento de audio para controlar la reproducción
  const audioRef = useRef(null);

  // Manejar la reproducción o pausa del audio
  const handlePlayPause = () => {
    if (!audioReady) {
      return;
    }

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    } else {
      audioRef.current.pause();
    }
    // Cambiar el estado de reproducción aquí
    onPlayPause(!audioRef.current.paused);
  };

  // Efecto secundario para controlar la reproducción cuando cambian las propiedades
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      if (audioRef.current.paused && audioReady) {
        audioRef.current
          .play()
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      }
    }
  }, [currentSong, audioReady]);

  // Manejar el evento onCanPlayThrough para indicar que el audio está listo
  const handleCanPlayThrough = () => {
    setAudioReady(true);
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  };

  // JSX del reproductor de música
  return (
    <div className="h-20 bg-gradient-to-b from-black to-slate-900 grid grid-cols-3 text-xs md:text-base px-2 md:px-8 border-transparent animate-slideup">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 hidden md:inline"
          src="/assets/glist logo.jpeg"
          alt=""
        />
        {currentSong && ( // Validación para currentSong
          <div>
            <h3 className="text-xs md:text-sm lg:text-base w-48 lg:w-auto">
              {currentSong.title}
            </h3>
            <p>Artist</p>
          </div>
        )}
      </div>
      {/* CENTER */}
      <div className="flex items-center justify-end space-x-4">
        <TbReload className="button" />
        <TbPlayerTrackPrevFilled className="button"/>
        {audioRef.current && audioRef.current.paused ? (
          <MdPlayCircle className="h-7 w-7 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" onClick={handlePlayPause} />
        ) : (
          <TbPlayerPauseFilled className="h-7 w-7 cursor-pointer hover:scale-125 transition transform duration-100 ease-out" onClick={handlePlayPause} />
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
