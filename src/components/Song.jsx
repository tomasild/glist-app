import React from "react";

function Song() {
  return (
    <div className="grid grid-cols-2 px-4 hover:bg-slate-800 opacity-75 rounded-md">
      <div className="flex items-center space-x-6">
        <p>1</p>
        <img src="./src/assets/glist logo nobg.png" className="w-10 h-10" />
        <div>
          <p>Song Name</p>
          <p>Artist</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p>Song Album</p>
        <p>Duration</p>
      </div>
    </div>
  );
}

export default Song;
