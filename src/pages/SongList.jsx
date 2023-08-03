import React, { useState, useEffect } from "react";
import Song from "../components/Song";
import axios from "axios";
import Search from "../components/Search";
function SongList() {
  const [songData, setSongData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [audioSources, setAudioSources] = useState({});
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    console.log("Obteniendo canciones desde el backend");
    axios
      .get("http://localhost:3000/api/songs/")
      .then((res) => {
        setSongData(res.data);
        setFilteredSongs(res.data);

        const audioSourcesObj = {};
        res.data.forEach((song) => {
          const audioUrl = `http://localhost:3000/api/songs/${song._id}/audio`;
          audioSourcesObj[song._id] = audioUrl;
        });
        setAudioSources(audioSourcesObj);
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

  const handlePlay = (songData) => {
    if (currentSong && currentSong._id === songData._id) {
      // Si la misma canción se está reproduciendo, pausamos o reanudamos la reproducción
      if (currentSong.audioElement.paused) {
        currentSong.audioElement.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else {
        currentSong.audioElement.pause();
      }
    } else {
      // Si es una nueva canción, pausamos la canción actual (si hay alguna) y reproducimos la nueva canción
      if (currentSong && currentSong.audioElement) {
        currentSong.audioElement.pause();
      }

      const audioElement = new Audio(audioSources[songData._id]);
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      setCurrentSong({ ...songData, audioElement });
    }
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
              albumId={song.albumId ? song.albumId._id : null}
              index={index + 1}
              _id={song._id}
              onPlay={handlePlay}
              isPlaying={currentSong && currentSong._id === song._id && !currentSong.audioElement.paused}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
