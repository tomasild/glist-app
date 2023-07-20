import React from "react";

function Song() {
  return (
    <div className="grid grid-cols-2 px-4 hover:bg-slate-800 opacity-75 rounded-md text-xs md:text-sm xl:text-base">
      <div className="flex items-center space-x-4 p-1">
        <p>ID</p>
        <img src="./src/assets/glist logo nobg.png" className="w-10 h-10" />
        <div>
          <p className="cursor-pointer">Song Name</p>
          <p className="cursor-pointer">Artist</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="cursor-pointer">Album</p>
        <p>Duration</p>
      </div>
    </div>
  );
}

export default Song;
