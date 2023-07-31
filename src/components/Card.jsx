import React from "react";

function Card({ title, year, imageSrc, _id, updated, created }) {
  return (
    <div className="text-white flex flex-col w-auto p-4 hover:bg-slate-800 opacity-75 rounded-md bg-slate-900 backdrop-blur-sm">
      <div className="relative w-full pt-2 group">
        <img
          src={imageSrc}
          className="w-auto max-w-full mx-auto h-auto lg:w-full md:w-5/6 rounded-lg"
          alt="Album cover"
        />
      </div>
      <div className="flex flex-col flex-grow items-center p-2">
        <p className="font-bold text-sm md:text-md">{title}</p>
        <p className="truncate text-sm md:text-md">{year}</p>
        <div className="flex flex-col flex-grow items-center justify-between mt-2">
          <p className="text-xs md:text-sm truncate">Updated: {updated}</p>
          <p className="text-xs md:text-sm truncate">Created: {created}</p>
          <p className="text-xs md:text-sm truncate mt-2">{_id}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
