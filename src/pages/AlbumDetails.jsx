import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Song from "../components/Song";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinFill } from "react-icons/ri";

function AlbumDetails() {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedYear, setEditedYear] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(albumData?.title || "");
    setEditedYear(albumData?.year || "");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Realizar la llamada a la API para actualizar el álbum
    const updatedAlbum = {
      title: editedTitle,
      year: editedYear,
    };

    axios
      .put(`http://localhost:3000/api/albums/${albumId}`, updatedAlbum)
      .then((res) => {
        // Actualizar los datos del álbum con la respuesta de la API
        setAlbumData(res.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error al actualizar el álbum:", err);
      });
  };

  const handleDeleteAlbum = () => {
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/api/albums/${albumId}`)
      .then((res) => {
        console.log("Álbum eliminado correctamente");
        // Redireccionar a la página Home después de eliminar el álbum
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("Error al eliminar el álbum:", err);
      });
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className="flex-grow text-white overflow-y-scroll h-screen scrollbar-hide animate-slowfade">
      <div className="w-full flex items-end space-x-7 bg-gradient-to-b to-black from-orange-950 h-64 text-white p-8">
        {albumData && !isEditing ? (
          <>
            <img
              className="h-28 w-28 lg:w-44 lg:h-44 md:w-36 md:h-36 shadow-2xl rounded-xl animate-slowfade"
              src="/assets/glist%20logo.jpeg"
              alt=""
            />
            <div className="text-white animate-slowfade">
              <div className="flex justify-start items-start mb-6 md:mb-8 xl:mb-10 space-x-4 text-gray-500 text-lg xl:text-xl">
                <button
                  onClick={handleEditClick}
                  className="hover:text-blue-500"
                >
                  <RxUpdate />
                </button>
                <button
                  onClick={handleDeleteAlbum}
                  className="hover:text-red-500"
                >
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
          <div className="text-white animate-slowfade">
            <div className="text-xs md:text-sm lg:text-lg flex flex-col space-y-2">
              <input
                className="rounded-md bg-slate-600 p-1 text-xs xl:text-base"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <input
                className="rounded-md bg-slate-600 p-1 text-xs xl:text-base"
                type="number"
                value={editedYear}
                onChange={(e) => setEditedYear(e.target.value)}
              />
              {albumData && (
                <div className="text-xs md:text-sm xl:text-base">
                  <p>
                    <strong>Updated: </strong>
                    {formatDate(albumData.updatedAt)}
                  </p>
                  <p>
                    <strong>Created: </strong>
                    {formatDate(albumData.createdAt)}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-start items-start space-x-4 text-sm xl:text-lg pt-2 text-white font-semibold">
              <button
                onClick={handleSaveClick}
                className="w-full px-1 rounded-sm bg-green-700 hover:bg-opacity-70"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="w-full px-1 rounded-sm bg-red-700 hover:bg-opacity-70"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid m-4 px-4 py-2 text-white max-w-7xl animate-slideup">
        <h2 className="mb-2">Description</h2>
        <p className="text-sm xl:text-base text-justify">
          {/* Descripción del álbum */}
        </p>
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

      {showDeletePopup && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="border border-transparent p-6 rounded-md backdrop-filter backdrop-blur-sm bg-slate-300 bg-opacity-10 shadow-lg">
            <p className="text-lg text-center mb-4 text-white">
              Are you sure you want to delete this album?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-bold"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumDetails;
