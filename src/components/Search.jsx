import React, { useState } from "react";
import { ImSearch } from "react-icons/im";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-4 flex items-center text-white font-semibold rounded-md px-2 bg-slate-800" style={{ minWidth: "200px" }}>
      <ImSearch size={16} className="mr-2" />
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
