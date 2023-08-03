import { FaPlay, FaPause } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

function Song({ title, duration, _id, albumId, index, onPlay, isPlaying }) {
  // Esta función se ejecuta cuando se hace clic en la canción para reproducirla.
  // Llama a la función "onPlay" que se pasa como prop y envía los detalles de la canción como argumento.
  const handlePlay = () => {
    onPlay({ title, duration, _id, albumId });
  };

  return (
    <div
      className={`grid grid-cols-2 px-4 py-2 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base ${
        isPlaying ? "bg-slate-600" : ""
      }`}
      onClick={handlePlay} 
      style={{ cursor: "pointer" }}
    >
      {/* Parte izquierda del componente que muestra la información de la canción */}
      <div className="flex items-center flex-grow space-x-4">
        <p className="font-bold mr-4">{index}</p>{" "}
        <img
          src="/assets/glist logo nobg.png"
          className={`w-10 h-10 ${isPlaying ? "hidden" : ""}`} // Mostrar/ocultar el ícono de reproducción/pausa
          alt=""
        />
        <div
          className={`w-10 h-10 flex items-center justify-center ${
            isPlaying ? "" : "hidden"
          }`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}{" "}
          {/* Ícono de reproducción o pausa dependiendo del estado */}
        </div>
        <div className="flex flex-col ml-4">
          <p className="w-32 md:w-40 lg:w-72 truncate">{title}</p>{" "}
          <p className="cursor-pointer">Artist</p>{" "}
        </div>
      </div>

      {/* Parte derecha del componente que muestra el enlace al álbum y la duración */}
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <Link to={`/album/${albumId}`} className="cursor-pointer">
          <p className="cursor-pointer hidden md:inline">{albumId}</p>{" "}
          {/* Enlace al álbum, pero se muestra como el ID del álbum */}
        </Link>
        <p>{duration}</p>
      </div>
    </div>
  );
}

export default Song;
