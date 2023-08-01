import { FaPlay } from 'react-icons/fa';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Song({ title, duration, _id, albumId, index }) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Funcion que maneja el efecto hover
  const handleHover = () => {
    setIsHovered(true);
  };

  // Funcion que maneja la salida del mouse sobre el elemento
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Función para obtener el archivo de audio del backend
  const fetchAudioFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/songs/${_id}/audio`,
        {
          responseType: "blob",
        }
      );
      const audioBlob = new Blob([response.data], { type: "audio/*" });
      setAudioUrl(URL.createObjectURL(audioBlob));
    } catch (error) {
      console.error("Error al obtener el archivo de audio:", error);
    }
  };

  return (
    <div
      className="grid grid-cols-2 px-4 py-2 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleHover} // For touch devices
      onTouchEnd={handleMouseLeave} // For touch devices
    >
      <div className="flex items-center space-x-4 p-1">
        <p className="font-bold">{index}</p>
        {isHovered ? ( 
          <button
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"
            onClick={fetchAudioFile} 
          >
            <FaPlay />
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

