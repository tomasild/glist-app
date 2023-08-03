import React, { useState, useEffect } from "react";
import axios from "axios";
import Song from "../components/Song";
import MusicPlayer from "../components/MusicPlayer";

function SongList() {
  const [songData, setSongData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSongChange = (songData) => {
    // Pausar la canción actual antes de cambiar a la nueva canción
    if (currentSong && currentSong.audioElement) {
      currentSong.audioElement.pause();
    }

    // Actualizar la nueva canción solo si es diferente a la actual
    if (currentSong && currentSong._id !== songData._id) {
      setCurrentSong(songData);
      setIsPlaying(true);
    } else if (!currentSong) {
      setCurrentSong(songData);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="text-white m-5 animate-slideup">
      {/* Resto del código del componente SongList... */}
      <ul className="space-y-1">
        {filteredSongs.map((song, index) => (
          <li key={song._id}>
            <Song
              title={song.title}
              duration={song.duration}
              albumId={song.albumId ? song.albumId._id : null}
              index={index + 1}
              _id={song._id}
              audioUrl={`http://localhost:3000/api/songs/${song._id}/audio`}
              isPlaying={currentSong && currentSong._id === song._id && isPlaying}
              onSongChange={handleSongChange} // Corregir el nombre de la prop para pasar la función correcta
            />
          </li>
        ))}
      </ul>

      {/* Aquí mostramos el componente MusicPlayer */}
      {currentSong && (
        <div className="fixed bottom-0 w-full left-0">
          <MusicPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
          />
        </div>
      )}
    </div>
  );
}

export default SongList;