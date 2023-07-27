import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSongForm = () => {
  const [title, setTitle] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [duration, setDuration] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/albums");
        setAlbums(response.data);
      } catch (error) {
        console.error("Error al obtener los álbumes:", error);
      }
    };
    fetchAlbums();
  }, []);

  const durationRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/;

  const formatDuration = (input) => {
    // Remove all non-numeric characters from the input
    const numericOnly = input.replace(/[^\d]/g, "");
    
    // Use regular expression to format the numeric input as HH:mm:ss
    const formattedDuration = numericOnly.replace(
      /(\d{2})(\d{2})(\d{2})/,
      "$1:$2:$3"
    );

    return formattedDuration;
  };

  const handleDurationChange = (e) => {
    const inputDuration = e.target.value;
  
    // Remove any non-numeric and non-colon characters from the input
    const cleanedDuration = inputDuration.replace(/[^0-9:]/g, "");
  
    // Use regular expression to format the numeric input as HH:mm:ss
    const formattedDuration = cleanedDuration.replace(
      /(\d{2})(\d{2})(\d{0,2}).*/,
      (_, p1, p2, p3) => {
        let result = p1;
        if (p2) result += ":" + p2;
        if (p3) result += ":" + p3;
        return result;
      }
    );
  
    // Limit the input length to 8 characters (HH:mm:ss format)
    if (formattedDuration.length <= 8) {
      setDuration(formattedDuration);
    } else {
      // Truncate the input if it exceeds 8 characters
      setDuration(formattedDuration.slice(0, 8));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/songs", {
        title,
        albumId,
        duration,
      });

      console.log("Canción agregada:", response.data);

      setTitle("");
      setAlbumId("");
      setDuration("");
    } catch (error) {
      console.error("Error al agregar la canción:", error);
    }
  };

  return (
    <div className="flex flex-col w-auto h-64 p-2 font-semibold text-white">
      <h2 className="p-2 text-white text-center">Agregar Nueva Canción</h2>
      <form onSubmit={handleSubmit} className="flex flex-col p-2 space-y-2">
        <div className="flex justify-end">
          <label className="mr-2">Álbum</label>
          <select
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            required
            className="w-full rounded-md bg-slate-600 p-1"
          >
            <option value="">Seleccione un álbum</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <label className="mr-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-md bg-slate-600 p-1"
          />
        </div>
        <div className="flex justify-end">
          <label className="mr-2">Duration</label>
          <input
            type="text"
            placeholder="hh:mm:ss"
            value={duration}
            onChange={handleDurationChange}
            required
            className="w-full rounded-md bg-slate-600 p-1 mb-2"
            pattern={durationRegex.source}
            title="Formato inválido. Utilice el formato hh:mm:ss"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-400 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;
