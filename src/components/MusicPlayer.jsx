import React from "react";

function MusicPlayer() {
  return (
    <div
      className="h-20 bg-gradient-to-b from-black to-slate-900
      grid grid-cols-3 text-xs md:text-base px-2 md:px-8"
    >
      {/* LEFT  */}
      <div className="flex items-center space-x-4">
        <img
          className="w-10 h-10 hidden md:inline"
          src="/assets/glist logo.jpeg"
          alt=""
        />
        <div>
          <h3>Song Name</h3>
          <p>Artist</p>
        </div>
      </div>
      {/* CENTER  */}

      {/* RIGHT  */}
    </div>
  );
}

export default MusicPlayer;
