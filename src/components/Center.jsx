import React from "react";
import { BiChevronDown } from "react-icons/bi";

function Center({children}) {
  return (
    <div className="flex-grow text-white overflow-y-scroll h-screen scrollbar-hide animate-slowfade">
      <header className="absolute top-5 right-7 ">
        <div className="flex items-center bg-slate-800 space-x-3 opacity-90 hover:opacity-75 cursor-pointer rounded-full p-1 pr-2">
          <img
            className="w-10 h-10 rounded-full border-2 border-slate-300 m-1"
            src="https://img.freepik.com/free-vector/electro-music-album_53876-67223.jpg?w=740&t=st=1689701162~exp=1689701762~hmac=49d62bf8558ef98736769a68af65d2e75494407b510940793079033b84b33656"
            alt=""
          />
          <h2>Usuario 1</h2>
          <BiChevronDown className="h-5 w-5" />
        </div>
      </header>

      <section className="w-full flex items-end space-x-7 bg-gradient-to-b to-black from-orange-950 h-64 text-white font-bold p-8">
        <img
          className="h-40 w-40 shadow-2xl rounded-xl animate-slowfade"
          src="./src/assets/glist logo.jpeg"
          alt=""
        />
        <div className="text-white animate-slowfade">
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">Groovelist</h1>
        </div>
      </section>

      <div>
        {children}
      </div>
    </div>
  );
}

export default Center;
