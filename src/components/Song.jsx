import { FaPlay, FaPause } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBinFill } from "react-icons/ri";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// Componente de una canción en la lista de canciones
function Song({
  title,
  duration,
  _id,
  albumId,
  index,
  audioUrl,
  isPlaying,
  onSongChange,
}) {
  // Manejar el clic en la canción para reproducirla
  const handleSongClick = () => {
    onSongChange({ title, duration, _id, albumId, audioUrl });
  };

  // Estado local para mostrar o ocultar detalles adicionales de la canción
  const [showDetails, setShowDetails] = useState(false);
  // Estado local para controlar si la canción está en modo de edición
  const [isEditing, setIsEditing] = useState(false);
  // Estados locales para almacenar los valores editados del título, duración y artista
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDuration, setEditedDuration] = useState(duration);
  const [editedArtist, setEditedArtist] = useState("");
  // Estado local para mostrar o ocultar el popup de confirmación de eliminación
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // Estado local para almacenar el ID de la canción que se va a eliminar
  const [songToDeleteId, setSongToDeleteId] = useState("");

  // Función para mostrar u ocultar los detalles adicionales de la canción
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Manejar el clic en el botón de editar
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Manejar el clic en el botón de cancelar edición
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // Manejar el clic en el botón de guardar cambios
  const handleSaveClick = async () => {
    // Realizar la llamada a la API para actualizar la canción
    const updatedSong = {
      title: editedTitle,
      duration: editedDuration,
      artist: editedArtist,
      _id,
      albumId,
      audioUrl,
    };

    try {
      await axios.put(`${BASE_URL}/songs/${_id}`, updatedSong);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar la canción:", error);
    }
  };

  // Manejar el clic en el botón de eliminar
  const handleDeleteClick = (songId) => {
    setSongToDeleteId(songId);
    setShowDeletePopup(true);
  };

  // Manejar la eliminación de la canción
  const handleDeleteSong = async (songId) => {
    try {
      await axios.delete(`${BASE_URL}/songs/${songId}`);
      setShowDeletePopup(false);
      console.log("Canción eliminada correctamente");
      // Redireccionar a la página Home después de eliminar el álbum
      window.location.href = "/";
    } catch (error) {
      console.error("Error al eliminar la canción:", error);
    }
  };

  // JSX del componente de la canción
  return (
    <div
      className={`grid grid-cols-2 px-4 py-2 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base ${
        isPlaying ? "bg-slate-900" : ""
      }`}
    >
      {/* Sección izquierda */}
      <div className="flex items-center flex-grow space-x-2">
        <p className="font-bold mr-2">{index}</p>
        <img
          src="/assets/glist logo nobg.png"
          className={`w-10 h-10 ${isPlaying ? "hidden" : ""}`}
          alt=""
          onClick={handleSongClick}
          style={{ cursor: "pointer" }}
        />
        <div
          className={`w-10 h-10 flex items-center justify-center p ${
            isPlaying ? "" : "hidden"
          }`}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="flex flex-col ml-4">
          {/* Título de la canción */}
          <p
            className="w-32 md:w-40 lg:w-72 truncate"
            onClick={handleSongClick}
            style={{ cursor: "pointer" }}
          >
            {title}
          </p>
          <p className="cursor-pointer">Artist</p>
        </div>
      </div>

      {/* Sección derecha */}
      <div className="flex items-center justify-between ml-auto md:ml-0">
        {/* Enlace al álbum */}
        <Link to={`/album/${albumId}`} className="cursor-pointer">
          <p className="cursor-pointer hidden md:inline">{albumId}</p>
        </Link>

        <p>{duration}</p>
        {/* Icono para mostrar y ocultar detalles */}
        <BiChevronDown
          onClick={toggleDetails}
          className={`text-white text-xl ml-2 md:text-2xl lg:text-3xl cursor-pointer ${
            showDetails ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {/* Información adicional */}
      {showDetails && (
        <div className="mt-4 col-span-2 flex flex-grow justify-between border-t-[1px] border-gray-500">
          <div className="text-white space-y-2 flex flex-col justify-end mt-4 mb-2">
            <p>Lyrics: ...</p>
            <p>Year: ...</p>
            <p>Instruments: ...</p>
          </div>
          <div className="flex items-end space-x-4 mr-2 mb-4 text-xs md:text-base lg:text-lg font-semibold text-white">
            {/* Botón de eliminar */}
            <button
              className="hover:text-red-500 hover:underline"
              onClick={() => handleDeleteClick(_id)}
            >
              <RiDeleteBinFill className="cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            </button>
            {/* Botón de editar */}
            {/* <button
              className="hover:text-blue-500 hover:underline"
              onClick={handleEditClick}
            >
              <RxUpdate className="cursor-pointer hover:scale-125 transition transform duration-100 ease-out" />
            </button> */}
          </div>
        </div>
      )}

      {/* Popup de confirmación para eliminar la canción */}
      {showDeletePopup && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="border border-transparent p-6 rounded-md backdrop-filter backdrop-blur-sm bg-slate-500 bg-opacity-10 shadow-lg">
            <p className="text-lg text-center mb-4 text-white">
              Are you sure you want to delete this song?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleDeleteSong(songToDeleteId)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-bold"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
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

export default Song;
