import React, { useState, useEffect } from "react";
import Song from "../components/Song";
import axios from "axios";

function SongList() {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    console.log("Obteniendo canciones desde el backend");
    axios
      .get("http://localhost:3000/api/songs/") // Asegúrate de que la URL sea correcta y apunte a tu servidor de Express
      .then((res) => setSongData(res.data))
      .catch((err) => {
        console.error("Error al obtener las canciones:", err);
      });
  }, []);

  return (
    <div className="text-white m-5 animate-slideup">
      <h2 className="mb-4 ml-2">Songs List</h2>
      <ul className="space-y-1">
        {songData.map((song, index) => (
          <li key={song._id}>
            <Song
              title={song.title}
              duration={song.duration}
              albumId={song.albumId._id}
              index={index + 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
