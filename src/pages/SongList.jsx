import React, { useState, useEffect } from "react";
import axios from "axios";
import Song from "../components/Song";
import MusicPlayer from "../components/MusicPlayer";


function SongList() {
  const [songData, setSongData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [audioSources, setAudioSources] = useState({});
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      if (currentSong.audioElement.paused) {
        currentSong.audioElement.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        setIsPlaying(true);
      } else {
        currentSong.audioElement.pause();
        setIsPlaying(false);
      }
    } else {
      if (currentSong && currentSong.audioElement) {
        currentSong.audioElement.pause();
      }

      const audioElement = new Audio(audioSources[songData._id]);
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });

      setCurrentSong({ ...songData, audioElement });
      setIsPlaying(true);
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
              audioUrl={audioSources[song._id]} // Agrega la prop audioUrl al componente Song
              onPlay={handlePlay}
              isPlaying={currentSong && currentSong._id === song._id && isPlaying} // Usa isPlaying del SongList
            />
          </li>
        ))}
      </ul>

      {/* Aquí mostramos el componente MusicPlayer */}
      {currentSong && (
        <div className="fixed bottom-0 w-full left-0">
        <MusicPlayer currentSong={currentSong} isPlaying={isPlaying} />
        </div>
      )}
    </div>
  );
}

export default SongList;
