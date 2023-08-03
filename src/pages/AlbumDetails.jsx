import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Song from "../components/Song";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinFill } from "react-icons/ri";

function AlbumDetails() {
  // Se obtiene el parámetro 'albumId' de la URL utilizando el hook 'useParams'
  const { albumId } = useParams();

  // Estado local del componente
  const [albumData, setAlbumData] = useState(null);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedYear, setEditedYear] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // Hook 'useEffect' para cargar los datos del álbum y las canciones al montar el componente
  useEffect(() => {
    // Obtener detalles del álbum desde el backend
    axios
      .get(`http://localhost:3000/api/albums/${albumId}`)
      .then((res) => {
        setAlbumData(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener detalles del álbum:", err);
      });

    // Obtener canciones del álbum desde el backend
    axios
      .get(`http://localhost:3000/api/songs/album/${albumId}`)
      .then((res) => {
        setAlbumSongs(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener canciones del álbum:", err);
      });
  }, [albumId]);

  // Función para formatear una fecha en formato local (español)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  // Manejadores para el modo de edición
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

  // Manejadores para eliminar el álbum
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

  // Renderizado del componente
  return (
    <div className="flex-grow text-white overflow-y-scroll h-screen scrollbar-hide animate-slowfade">
      {/* Sección de detalles del álbum */}
      <div className="w-full flex items-end space-x-7 bg-gradient-to-b to-black from-orange-950 h-64 text-white p-8">
        {/* Modo de vista no editable */}
        {albumData && !isEditing ? (
          <>
            {/* Imagen del álbum */}
            <img
              className="h-28 w-28 lg:w-44 lg:h-44 md:w-36 md:h-36 shadow-2xl rounded-xl animate-slowfade"
              src="/assets/glist%20logo.jpeg"
              alt=""
            />
            <div className="text-white animate-slowfade">
              <div className="flex justify-start items-start mb-6 md:mb-8 xl:mb-10 space-x-4 text-gray-500 text-lg xl:text-xl">
                {/* Botones de editar y eliminar */}
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
                {/* Detalles del álbum */}
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
          // Modo de edición
          <div className="text-white animate-slowfade">
            <div className="text-xs md:text-sm lg:text-lg flex flex-col space-y-2">
              {/* Campos editables del álbum */}
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
                  {/* Detalles del álbum en modo edición */}
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
              {/* Botones de guardar y cancelar edición */}
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
      {/* Descripción del álbum */}
      <div className="grid m-4 px-4 py-2 text-white max-w-7xl animate-slideup">
        <h2 className="mb-2">Description</h2>
        <p className="text-sm xl:text-base text-justify">
          {/* Descripción del álbum */}
        </p>
      </div>
      <div className="text-white m-5 animate-slideup">
        <h2 className="mb-4 ml-2">Album songs</h2>
        {/* Lista de canciones del álbum */}
        {albumSongs.length > 0 ? (
          <ul className="space-y-1">
            {albumSongs.map((song, index) => (
              <li key={song._id}>
                {/* Renderizado de cada canción */}
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
          // Mensaje cuando no hay canciones asociadas al álbum
          <p className="text-white m-5 animate-slideup">
            No se encontraron canciones asociadas al álbum.
          </p>
        )}
      </div>

      {/* Popup de confirmación para eliminar el álbum */}
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
