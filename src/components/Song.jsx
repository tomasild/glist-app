import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Song({ title, duration, _id, albumId, index }) {
  const [audioUrl, setAudioUrl] = useState(null);

  // Función para obtener el archivo de audio del backend
  const fetchAudioFile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/songs/${_id}/audio`, {
        responseType: "blob",
      });
      const audioBlob = new Blob([response.data], { type: "audio/*" });
      setAudioUrl(URL.createObjectURL(audioBlob));
    } catch (error) {
      console.error("Error al obtener el archivo de audio:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 px-4 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base">
      <div className="flex items-center space-x-4 p-1">
        <p className="font-bold">{index}</p>
        <img src="/assets/glist logo nobg.png" className="w-10 h-10" />
        <div>
          <p>{title}</p>
          <p className="cursor-pointer">Artist</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Link to={`/album/${albumId}`} className="cursor-pointer">
          <p className="cursor-pointer">{albumId}</p>
        </Link>
        <p>{duration}</p>
        <button onClick={fetchAudioFile} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
          Play
        </button>
      </div>
      {audioUrl && (
        <audio controls className="col-span-2 mt-2">
          <source src={audioUrl} type="audio/*" />
        </audio>
      )}
    </div>
  );
}

export default Song;
