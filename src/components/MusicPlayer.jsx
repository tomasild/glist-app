import React from "react";
import {
  TbSwitch2,
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
  TbPlayerPlayFilled,
  TbPlayerStopFilled,
  TbRepeat,
  TbVolume,
  TbVolumeOff,
  TbVolume2,
} from "react-icons/tb";



function MusicPlayer() {
  return (
    <div
      className="h-24 bg-gradient-to-b from-black to-slate-700
      grid grid-cols-3 text-xs md:text-base px-2 md:px-8 fixed bottom-0 w-screen"
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
      <div className="flex items-center justify-evenly">
        <TbSwitch2 className="button" />
        <TbPlayerTrackPrevFilled className="button" />
        <TbPlayerPlayFilled className="button" />
        <TbPlayerTrackNextFilled className="button" />
        <TbRepeat className="button" />
      </div>
      {/* RIGHT  */}
      <div className="flex items-center justify-end mr-5">
        <TbVolume className="button"/>
      </div>
    </div>
  );
}

export default MusicPlayer;
