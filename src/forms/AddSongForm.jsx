import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSongForm = () => {
  const [titulo, setTitulo] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [duracion, setDuracion] = useState("");
  const [albums, setAlbums] = useState([]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [archivoBuffer, setArchivoBuffer] = useState(null);

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

  const handleDuracionChange = (e) => {
    setDuracion(e.target.value);
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setArchivoSeleccionado(archivo);

      // Leer el contenido del archivo como un blob
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const buffer = fileReader.result;
        const blob = new Blob([new Uint8Array(buffer)]); // Convertir el buffer a Blob
        setArchivoBuffer(blob);
      };
      fileReader.readAsArrayBuffer(archivo);

      // Rellenar automáticamente la duración de la canción
      const audio = new Audio();
      audio.src = URL.createObjectURL(archivo);
      audio.addEventListener("loadedmetadata", () => {
        const duracionArchivo = Math.floor(audio.duration);
        const minutos = Math.floor(duracionArchivo / 60);
        const segundos = duracionArchivo % 60;
        setDuracion(`${minutos}:${segundos.toString().padStart(2, "0")}`);

        // Rellenar automáticamente el título de la canción con el nombre del archivo sin la extensión
        const nombreArchivo = archivo.name.replace(/\.[^/.]+$/, "");
        setTitulo(nombreArchivo);
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validar que todos los campos requeridos estén completos antes de enviar la solicitud POST
    if (!titulo || !albumId || !duracion || !archivoBuffer) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", titulo);
    formData.append("albumId", albumId);
    formData.append("duration", duracion);
    formData.append("audioFile", archivoBuffer, archivoSeleccionado.name);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/songs",
        formData
      );

      console.log("Canción agregada:", response.data);

      setTitulo("");
      setAlbumId("");
      setDuracion("");
      setArchivoSeleccionado(null);
      setArchivoBuffer(null);
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
          <label className="mr-2">Audio file</label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            required
            className="w-full rounded-md bg-slate-600 p-1 mb-2"
          />
        </div>
        <div className="flex justify-end">
          <label className="mr-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="w-full rounded-md bg-slate-600 p-1"
          />
        </div>
        <div className="flex justify-end">
          <label className="mr-2">Duración</label>
          <input
            type="text"
            placeholder="mm:ss"
            value={duracion}
            onChange={handleDuracionChange}
            required
            className="w-full rounded-md bg-slate-600 p-1 mb-2"
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
