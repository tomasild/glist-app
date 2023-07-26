import React, { useState } from 'react';
import axios from 'axios';

const AddAlbumForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar los datos del formulario al backend
      const response = await axios.post('http://localhost:3000/api/albums', {
        title,
        year: parseInt(year), // Asegurarse de que el año sea un número
      });

      // Aquí puedes realizar cualquier acción necesaria con la respuesta del backend
      console.log('Álbum agregado:', response.data);

      // Limpiar los campos del formulario después de agregar el álbum
      setTitle('');
      setYear('');
    } catch (error) {
      console.error('Error al agregar el álbum:', error);
    }
  };

  return (
    <div className='text-white'>
      <h2>Agregar Nuevo Álbum</h2>
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
          <label>Año:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Álbum</button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
