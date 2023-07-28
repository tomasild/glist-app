import React, { useState, useEffect } from "react";
import Song from "../components/Song";
import axios from "axios";
import Search from "../components/Search";

function SongList() {
  const [songData, setSongData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    console.log("Obteniendo canciones desde el backend");
    axios
      .get("http://localhost:3000/api/songs/")
      .then((res) => {
        setSongData(res.data);
        setFilteredSongs(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener las canciones:", err);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = songData.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  return (
    <div className="text-white m-5 animate-slideup">
      <Search onSearch={handleSearch} />
      <ul className="space-y-1">
        {filteredSongs.map((song, index) => (
          <li key={song._id}>
            <Song
              title={song.title}
              duration={song.duration}
              albumId={song.albumId._id}
              index={index + 1}
              _id={song._id} // Pasar el ID de la canción a Song
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
