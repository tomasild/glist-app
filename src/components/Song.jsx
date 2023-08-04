import { FaPlay, FaPause } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinFill } from "react-icons/ri";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Definir la URL base para las peticiones a la API
const BASE_URL = "http://localhost:3000/api";

function Song({
  // Props para los detalles de la canción
  title,
  duration,
  _id,
  albumId,
  index,
  audioUrl,
  isPlaying,
  onSongChange,
}) {
  // Manejador para cuando se hace clic en una canción
  const handleSongClick = () => {
    onSongChange({ title, duration, _id, albumId, audioUrl });
  };

  // Manejador para alternar la visualización de los detalles de la canción
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Variables de estado para gestionar el estado del componente
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDuration, setEditedDuration] = useState(duration);

  // Manejador para cuando se hace clic en el botón de edición
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Manejador para cuando se hace clic en el botón de cancelar durante la edición
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // Manejador para cuando se hace clic en el botón de guardar durante la edición
  const handleSaveClick = async () => {
    // Preparar los datos de la canción actualizada
    const updatedSong = {
      title: editedTitle,
      duration: editedDuration,
      _id,
      albumId,
      audioUrl,
    };

    try {
      // Realizar una petición PUT para actualizar los datos de la canción
      await axios.put(`${BASE_URL}/songs/${_id}`, updatedSong);
      setIsEditing(false); // Salir del modo de edición
      // Actualizar la página después de guardar los cambios
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar la canción:", error);
    }
  };

  // Manejador para cuando se hace clic en el botón de eliminar
  const handleDeleteClick = (songId) => {
    setSongToDeleteId(songId); // Establecer el ID de la canción a eliminar
    setShowDeletePopup(true); // Mostrar el popup de confirmación de eliminación
  };

  // Manejador para cuando se hace clic en el botón "Sí" en el popup de eliminación
  const handleDeleteSong = async (songId) => {
    try {
      // Realizar una petición DELETE para eliminar la canción
      await axios.delete(`${BASE_URL}/songs/${songId}`);
      setShowDeletePopup(false); // Ocultar el popup de confirmación de eliminación
      console.log("Canción eliminada correctamente");
      // Redirigir a la página de inicio después de eliminar la canción
      window.location.href = "/";
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
    }
  };

  // Variables de estado para gestionar el popup de eliminación
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [songToDeleteId, setSongToDeleteId] = useState("");

  // Renderizado JSX para el componente Song
  return (
    <div
      className={`grid grid-cols-2 px-4 py-2 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base ${
        isPlaying ? "bg-slate-900" : ""
      }`}
    >
      <div className="flex items-center flex-grow space-x-2">
        {/* Mostrar el índice de la canción */}
        <p className="font-bold mr-2">{index}</p>
        {/* Mostrar la miniatura de la canción */}
        <img
          src="/assets/glist logo nobg.png"
          className={`w-10 h-10 ${isPlaying ? "hidden" : ""}`}
          alt=""
          onClick={handleSongClick}
          style={{ cursor: "pointer" }}
        />
        {/* Mostrar iconos de reproducción/pausa */}
        <div
          className={`w-10 h-10 flex items-center justify-center p ${
            isPlaying ? "" : "hidden"
          }`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        {/* Mostrar detalles de la canción */}
        <div className="flex flex-col ml-4">
          {isEditing ? (
            // Campo de entrada para editar el título de la canción
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full md:w-40 bg-gray-600 text-white font-semibold lg:w-72 truncate border border-gray-500 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          ) : (
            // Mostrar el título de la canción (clickeable para reproducir la canción)
            <p
              className="w-32 md:w-40 lg:w-72 truncate"
              onClick={handleSongClick}
              style={{ cursor: "pointer" }}
            >
              {title}
            </p>
          )}
          {/* Espacio reservado para mostrar el artista (no implementado) */}
          <p className="cursor-pointer">Artista</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        {/* Mostrar el ID del álbum con un enlace a la página del álbum */}
        <Link to={`/album/${albumId}`} className="cursor-pointer">
          <p className="cursor-pointer hidden md:inline">{albumId}</p>
        </Link>

        {isEditing ? (
          // Campo de entrada para editar la duración de la canción
          <input
            type="text"
            value={editedDuration}
            onChange={(e) => setEditedDuration(e.target.value)}
            className="w-20 md:w-24 rounded-md bg-gray-600 text-white font-semibold border border-gray-500 px-2 py-1 text-center focus:outline-none focus:ring focus:border-blue-300"
          />
        ) : (
          // Mostrar la duración de la canción
          <p>{duration}</p>
        )}
        {/* Icono de chevron para mostrar/ocultar los detalles de la canción */}
        <BiChevronDown
          onClick={toggleDetails}
          className={`text-white text-xl ml-2 md:text-2xl lg:text-3xl cursor-pointer ${
            showDetails ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {/* Mostrar los detalles de la canción si showDetails es true */}
      {showDetails && (
        <div className="mt-4 col-span-2 flex flex-grow justify-between border-t-[1px] border-gray-500">
          <div className="text-white space-y-2 flex flex-col justify-end mt-4 mb-2">
            {/* Espacios reservados para mostrar letras, año e instrumentos (no implementados) */}
            <p>Letras: ...</p>
            <p>Año: ...</p>
            <p>Instrumentos: ...</p>
          </div>
          <div className="flex items-end space-x-4 mr-2 mb-4 text-xs md:text-base lg:text-lg font-semibold text-white">
            {/* Botón para eliminar la canción */}
            <button
              className="hover:text-red-500 hover:underline"
              onClick={() => handleDeleteClick(_id)}
            >
              <RiDeleteBinFill className="cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            </button>
            {isEditing ? (
              // Botones para aceptar o cancelar la edición
              <>
                <button
                  className="text-white bg-green-500 py-1 px-2 font-semibold rounded-md hover:bg-green-700"
                  onClick={handleSaveClick}
                >
                  Aceptar
                </button>
                <button
                  className="text-white bg-red-500 py-1 px-2 font-semibold rounded-md hover:bg-red-700"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </button>
              </>
            ) : (
              // Botón para entrar en modo de edición
              <button
                className="hover:text-blue-500 hover:underline"
                onClick={handleEditClick}
              >
                <RxUpdate className="cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mostrar el popup de eliminación si showDeletePopup es true */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="border border-transparent p-6 rounded-md backdrop-filter backdrop-blur-sm bg-slate-500 bg-opacity-10 shadow-lg">
            <p className="text-lg text-center mb-4 text-white">
              ¿Estás seguro de que quieres eliminar esta canción?
            </p>
            <div className="flex justify-center space-x-4">
              {/* Botón "Sí" para confirmar la eliminación */}
              <button
                onClick={() => handleDeleteSong(songToDeleteId)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-bold"
              >
                Sí
              </button>
              {/* Botón "Cancelar" para cancelar la eliminación */}
              <button
                onClick={() => setShowDeletePopup(false)}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-bold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Song;
