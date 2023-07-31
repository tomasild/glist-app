import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Song from "../components/Song";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinFill } from "react-icons/ri";

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
              className="h-28 w-28 lg:w-44 lg:h-44 md:w-36 md:h-36 shadow-2xl rounded-xl animate-slowfade"
              src="/assets/glist%20logo.jpeg"
              alt=""
            />
            <div className="text-white animate-slowfade">
              <div className="flex justify-start items-start mb-6 md:mb-8 xl:mb-10 space-x-4 text-gray-500 text-lg xl:text-xl">
                <button className="hover:text-blue-500">
                  <RxUpdate />
                </button>
                <button className="hover:text-red-500">
                  <RiDeleteBinFill />
                </button>
              </div>
              <div className="text-xs md:text-sm lg:text-lg">
              <p>
                <strong>{albumData.title}</strong>
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
            </div>
          </>
        ) : (
          <p className="text-white m-5">Cargando detalles del álbum...</p>
        )}
      </div>
      <div className="grid m-4 px-4 py-2 text-white max-w-7xl">
        <h2 className="mb-2">Description</h2>
        <p className="text-sm xl:text-base text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores minima dolores aspernatur sequi, quasi corporis repellendus praesentium sapiente delectus maxime! Labore, ad. Expedita dolorem dolorum voluptas ullam tempore tempora officia.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores minima dolores aspernatur sequi, quasi corporis repellendus praesentium sapiente delectus maxime! Labore, ad. Expedita dolorem dolorum voluptas ullam tempore tempora officia.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores minima dolores aspernatur sequi, quasi corporis repellendus praesentium sapiente delectus maxime! Labore, ad. Expedita dolorem dolorum voluptas ullam tempore tempora officia.</p>
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
