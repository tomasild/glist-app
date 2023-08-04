import React, { useState, useEffect } from "react";
import axios from "axios";

// Componente del formulario para agregar una nueva canción
const AddSongForm = () => {
  // Estados locales para almacenar el título, el ID del álbum, la duración, la lista de álbumes,
  // el archivo seleccionado y el contenido del archivo en formato buffer
  const [titulo, setTitulo] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [duracion, setDuracion] = useState("");
  const [albums, setAlbums] = useState([]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [archivoBuffer, setArchivoBuffer] = useState(null);

  // useEffect para cargar la lista de álbumes desde la API al montar el componente
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

  // Manejar el cambio de la duración en el campo de entrada
  const handleDuracionChange = (e) => {
    setDuracion(e.target.value);
  };

  // Manejar el cambio de archivo seleccionado en el campo de entrada de archivos
  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setArchivoSeleccionado(archivo);

      // Leer el contenido del archivo como un blob y convertirlo en buffer
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

  // Manejar el envío del formulario para agregar una nueva canción
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar que todos los campos requeridos estén completos antes de enviar la solicitud POST
    if (!titulo || !albumId || !duracion || !archivoBuffer) {
      console.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Crear un objeto con los datos para la nueva canción
      const nuevaCancion = {
        title: titulo,
        albumId: albumId,
        duration: duracion,
      };

      // Crear un objeto FormData para enviar el archivo de música en formato buffer
      const formData = new FormData();
      formData.append("title", nuevaCancion.title);
      formData.append("albumId", nuevaCancion.albumId);
      formData.append("duration", nuevaCancion.duration);
      formData.append("file", archivoBuffer, archivoSeleccionado.name);

      // Realizar la petición POST utilizando axios y enviar el formulario
      const response = await axios.post("http://localhost:3000/api/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Canción agregada:", response.data);

      // Limpiar los campos después de agregar la canción
      setTitulo("");
      setAlbumId("");
      setDuracion("");
      setArchivoSeleccionado(null);
      setArchivoBuffer(null);
    } catch (error) {
      console.error("Error al agregar la canción:", error);
    }
  };

  // JSX del componente del formulario de agregar canción
  return (
    <div className="flex flex-col w-auto h-64 p-2 font-semibold text-white">
      <h2 className="p-2 text-white text-center">Agregar Nueva Canción</h2>
      <form onSubmit={handleSubmit} className="flex flex-col p-2 space-y-2">
        {/* Selector para elegir el álbum */}
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
        {/* Campo de entrada para seleccionar el archivo de audio */}
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
        {/* Campo de entrada para el título de la canción */}
        <div className="flex justify-end">
          <label className="mr-2">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)} // Actualiza el estado del título al escribir
            required
            className="w-full rounded-md bg-slate-600 p-1"
          />
        </div>
        {/* Campo de entrada para la duración de la canción */}
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
        {/* Botón para agregar la canción */}
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
