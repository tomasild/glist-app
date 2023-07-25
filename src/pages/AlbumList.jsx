import React, { useState, useEffect } from "react";
import Album from "../components/Album";
import axios from "axios";

function AlbumList() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    console.log("Obteniendo álbumes desde el backend");
    axios
      .get("http://localhost:3000/api/albums/")
      .then((res) => setAlbums(res.data))
      .catch((err) => {
        console.err("Error al obtener los álbumes:", err);
      });
  }, []);

  // Funcion para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  return (
    <div className="text-white m-5 animate-slideup">
      <h2 className="mb-4 ml-2">Lista de Álbumes</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {albums.map((album) => (
          <li key={album._id}>
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
