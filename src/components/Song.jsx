import { FaPlay, FaPause } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

function Song({ title, duration, _id, albumId, index, audioUrl, isPlaying, onSongChange }) {
  const handleSongClick = () => {
    onSongChange({ title, duration, _id, albumId, audioUrl });
  };

  return (
    <div
      className={`grid grid-cols-2 px-4 py-2 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base ${
        isPlaying ? "bg-slate-600" : ""
      }`}
      onClick={handleSongClick}
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-center flex-grow space-x-4">
        <p className="font-bold mr-4">{index}</p>{" "}
        <img
          src="/assets/glist logo nobg.png"
          className={`w-10 h-10 ${isPlaying ? "hidden" : ""}`}
          alt=""
        />
        <div className={`w-10 h-10 flex items-center justify-center ${isPlaying ? "" : "hidden"}`}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="flex flex-col ml-4">
          <p className="w-32 md:w-40 lg:w-72 truncate">{title}</p>
          <p className="cursor-pointer">Artist</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <Link to={`/album/${albumId}`} className="cursor-pointer">
          <p className="cursor-pointer hidden md:inline">{albumId}</p>
        </Link>
        <p>{duration}</p>
      </div>
    </div>
  );
}

export default Song;
