import React, { useState, useEffect } from "react";
import Album from "../components/Album";
import axios from "axios";
import Search from "../components/Search";

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    console.log("Obteniendo álbumes desde el backend");
    axios
      .get("http://localhost:3000/api/albums/")
      .then((res) => {
        setAlbums(res.data);
        setFilteredAlbums(res.data); // Initialize filteredAlbums with all albums
      })
      .catch((err) => {
        console.err("Error al obtener los álbumes:", err);
      });
  }, []);

  // Funcion para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  // Function to handle search
  const handleSearch = (searchTerm) => {
    const filtered = albums.filter((album) =>
      album.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAlbums(filtered);
  };

  return (
    <div className="text-white m-5 animate-slideup">
      {/* Componente de búsqueda */}
      <Search onSearch={handleSearch} />
      {/* Lista de álbumes */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredAlbums.map((album) => (
          <li key={album._id}>
            {/* Renderizado de cada álbum */}
            <Album
              title={album.title}
              year={album.year}
              _id={album._id}
              updatedAt={formatDate(album.updatedAt)}
              createdAt={formatDate(album.createdAt)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;
