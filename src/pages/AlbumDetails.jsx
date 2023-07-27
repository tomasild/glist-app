import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Song from "../components/Song";

function AlbumDetails() {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);

  useEffect(() => {
    console.log("Obteniendo detalles del álbum desde el backend");
    axios
      .get(`http://localhost:3000/api/albums/${albumId}`)
      .then((res) => {
        setAlbumData(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener detalles del álbum:", err);
      });

    console.log("Obteniendo canciones del álbum desde el backend");
    axios
      .get(`http://localhost:3000/api/songs/album/${albumId}`)
      .then((res) => {
        setAlbumSongs(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener canciones del álbum:", err);
      });
  }, [albumId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  return (
    <div className="flex-grow text-white overflow-y-scroll h-screen scrollbar-hide animate-slowfade">
      <div className="w-full flex items-end space-x-7 bg-gradient-to-b to-black from-orange-950 h-64 text-white p-8">
        {albumData ? (
          <>
            <img
              className="h-40 w-40 shadow-2xl rounded-xl animate-slowfade"
              src="/assets/glist%20logo.jpeg"
              alt=""
            />
            <div className="text-white animate-slowfade">
              <p>
                <strong>Title: </strong>
                {albumData.title}
              </p>
              <p>
                <strong>Year: </strong>
                {albumData.year}
              </p>
              <p>
                <strong>Updated: </strong>
                {formatDate(albumData.updatedAt)}
              </p>
              <p>
                <strong>Created: </strong>
                {formatDate(albumData.createdAt)}
              </p>
            </div>
          </>
        ) : (
          <p className="text-white m-5">Cargando detalles del álbum...</p>
        )}
      </div>

      <div className="text-white m-5 animate-slideup">
        <h2 className="mb-4 ml-2">Album songs</h2>
        {albumSongs.length > 0 ? (
          <ul className="space-y-1">
            {albumSongs.map((song, index) => (
              <li key={song._id}>
                <Song
                  title={song.title}
                  duration={song.duration}
                  albumId={song.albumId._id}
                  index={index + 1}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white m-5 animate-slideup">
            No se encontraron canciones asociadas al álbum.
          </p>
        )}
      </div>
    </div>
  );
}

export default AlbumDetails;
