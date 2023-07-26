import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSongForm = () => {
  const [title, setTitle] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [duration, setDuration] = useState(''); // Nuevo estado para la duración
  const [albums, setAlbums] = useState([]);

  // Obtener la lista de álbumes disponibles al cargar la página
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/albums');
        setAlbums(response.data);
      } catch (error) {
        console.error('Error al obtener los álbumes:', error);
      }
    };
    fetchAlbums();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar los datos del formulario al backend, incluyendo el ID del álbum seleccionado y la duración
      const response = await axios.post('http://localhost:3000/api/songs', {
        title,
        albumId,
        duration,
      });

      // Aquí puedes realizar cualquier acción necesaria con la respuesta del backend
      console.log('Canción agregada:', response.data);

      // Limpiar los campos del formulario después de agregar la canción
      setTitle('');
      setAlbumId('');
      setDuration('');
    } catch (error) {
      console.error('Error al agregar la canción:', error);
    }
  };

  return (
    <div>
      <h2>Agregar Nueva Canción</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Álbum:</label>
          <select value={albumId} onChange={(e) => setAlbumId(e.target.value)} required>
            <option value="">Seleccione un álbum</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Duración:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Canción</button>
      </form>
    </div>
  );
};

export default AddSongForm;
