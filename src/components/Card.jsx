import React from "react";

function Card({ title, year, imageSrc, _id, updated, created }) {
  return (
    <div className="text-white flex flex-col w-full p-4 hover:bg-slate-800 opacity-75 rounded-md bg-slate-900 backdrop-blur-sm">
      <div className="relative w-full group">
        <img
          src={imageSrc}
          className="w-full h-auto rounded-lg"
          alt="Album cover"
        />
      </div>
      <div className="flex flex-col flex-grow items-center p-2">
        <p className="font-bold">{title}</p>
        <p className="truncate">{year}</p>
        <div className="flex flex-col flex-grow items-center justify-between mt-2">
          <p className="truncate">Updated: {updated}</p>
          <p className="truncate">Created: {created}</p>
          <p className="truncate mt-2">{_id}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
