import React, { useState } from "react";
import axios from "axios";

// Componente del formulario para agregar un nuevo álbum
const AddAlbumForm = () => {
  // Estados locales para almacenar el título y el año del álbum
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  // Expresiones regulares para validar el título y el año del álbum
  const titleRegex = /^[a-zA-Z0-9\s\-.,()']+$/; // Alphanumeric, spaces, hyphens, commas, periods, parentheses, and single quotes
  const yearRegex = /^\d{4}$/; // Four digits only

  // Manejar el envío del formulario para agregar un nuevo álbum
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Validar el título del álbum con la expresión regular
      if (!titleRegex.test(title)) {
        alert("El título del álbum contiene caracteres no permitidos.");
        return;
      }

      // Validar el año del álbum con la expresión regular
      if (!yearRegex.test(year)) {
        alert("Ingrese un año válido con cuatro dígitos.");
        return;
      }

      // Realizar la llamada a la API para agregar el álbum
      const response = await axios.post("http://localhost:3000/api/albums", {
        title,
        year: parseInt(year), // Asegurarse de que el año sea un número
      });

      console.log("Álbum agregado:", response.data);

      // Limpiar los campos del formulario después de agregar el álbum
      setTitle("");
      setYear("");
    } catch (error) {
      console.error("Error al agregar el álbum:", error);
    }
  };

  // JSX del componente del formulario de agregar álbum
  return (
    <div className="flex flex-col w-auto h-48 p-2 font-semibold text-white">
      <h2 className="p-2 text-white text-center">Agregar Nuevo Álbum</h2>
      <form onSubmit={handleSubmit} className="flex flex-col p-2 space-y-2">
        {/* Campo de entrada para el título del álbum */}
        <div className="flex justify-end">
          <label className="mr-2">Title</label>
          <input
            type="text"
            placeholder="Album name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-md bg-slate-600 p-1"
          />
        </div>
        {/* Campo de entrada para el año del álbum */}
        <div className="flex justify-end">
          <label className="mr-2">Year</label>
          <input
            type="text"
            placeholder="0000"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="w-full rounded-md bg-slate-600 p-1"
          />
        </div>
        {/* Botón para agregar el álbum */}
        <button
          type="submit"
          className="bg-orange-400 hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
