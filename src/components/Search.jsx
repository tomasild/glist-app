import React, { useState } from "react";
import { ImSearch } from "react-icons/im";

// Componente de búsqueda
function Search({ onSearch }) {
  // Estado local para rastrear el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Manejar el cambio en el input de búsqueda
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Llamar a la función onSearch para pasar el término de búsqueda al componente padre
    onSearch(value);
  };

  // JSX del componente de búsqueda
  return (
    <div className="mb-4 flex items-center text-white font-semibold rounded-md px-2 bg-slate-800" style={{ minWidth: "200px" }}>
      {/* Icono de búsqueda */}
      <ImSearch size={16} className="mr-2" />
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={handleInputChange}
        className="py-1 px-2 bg-slate-800 text-white font-semibold rounded-md focus:outline-none flex-1"
      />
    </div>
  );
}

export default Search;
