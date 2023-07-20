import React from "react";

function Card({ title, year, imageSrc, id, updated, created }) {
  return (
    <div className="text-white flex flex-col w-[250px] p-4 hover:bg-slate-800 opacity-75 rounded-md bg-slate-900 backdrop-blur-sm cursor-pointer">
      <div className="relative w-full h-56 group">
        <p className="absolute pl-2 pt-1 font-bold">{id}</p>
        <img
          src={imageSrc}
          className="w-full h-full rounded-lg"
          alt="Album cover"
        />
      </div>
      <div className="flex flex-col items-center p-2">
        <p className="font-bold mb-2">{title}</p>
        <p className="">{year}</p>
        <div>
          <p>Updated: {updated}</p>
          <p>Created: {created}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
