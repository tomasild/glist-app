import React from "react";
import { Link } from "react-router-dom";

function Song({ title, duration, _id, albumId, index }) {
  return (
    <div className="grid grid-cols-2 px-4 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base">
      <div className="flex items-center space-x-4 p-1">
        <p className="font-bold">{index}</p>
        <img src="/assets/glist logo nobg.png" className="w-10 h-10" />
        <div>
          <p>{title}</p>
          <p className="cursor-pointer">Artist</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Link to={`/album/${albumId}`} className="cursor-pointer">
          <p className="cursor-pointer">{albumId}</p>
        </Link>
        <p>{duration}</p>
      </div>
    </div>
  );
}

export default Song;
