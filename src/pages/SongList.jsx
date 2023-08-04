import React, { useState, useEffect } from "react";
import axios from "axios";
import Song from "../components/Song";
import MusicPlayer from "../components/MusicPlayer";

function SongList() {
  // Estado local del componente
  const [songData, setSongData] = useState([]); // Almacena la lista completa de canciones
  const [filteredSongs, setFilteredSongs] = useState([]); // Almacena la lista de canciones filtradas según la búsqueda
  const [currentSong, setCurrentSong] = useState(null); // Almacena los datos de la canción que se está reproduciendo actualmente
  const [isPlaying, setIsPlaying] = useState(false); // Indica si la canción actual está reproduciéndose o en pausa

  // Hook 'useEffect' para obtener las canciones desde el backend al montar el componente
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

  // Función para manejar la búsqueda de canciones
  const handleSearch = (searchTerm) => {
    // Filtrar las canciones cuyos títulos coincidan con el término de búsqueda (ignorando mayúsculas y minúsculas)
    const filtered = songData.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  // Función para manejar la reproducción/pausa de la canción actual
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Cambiar el estado de reproducción/pausa
  };

  // Función para manejar el cambio de canción al hacer clic en una canción de la lista
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
      setIsPlaying(!isPlaying); // Alternar entre reproducir y pausar la canción actual
    }
  };

  return (
    <div className="text-white m-5 animate-slideup">
      {/* Resto del código del componente SongList... */}
      <ul className="space-y-1">
        {/* Mapear las canciones filtradas y renderizar el componente Song para cada una */}
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
              onSongChange={handleSongChange} // Pasar la función de manejo de cambio de canción como prop
            />
          </li>
        ))}
      </ul>

      {/* Mostrar el componente MusicPlayer solo si hay una canción actual */}
      {currentSong && (
        <div className="fixed bottom-0 w-full left-0">
          <MusicPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)} // Pasar la función de manejo de reproducción/pausa como prop
          />
        </div>
      )}
    </div>
  );
}

export default SongList;
