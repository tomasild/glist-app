import React from "react";
import { ImHome, ImSearch } from "react-icons/im";
import { MdLibraryMusic, MdLibraryAdd } from "react-icons/md";
import { RiFolderMusicFill } from "react-icons/ri";
import { FaFolderPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div
      className="
    text-gray-500
      p-5
      text-xs
      lg:text-sm
      border-r
    border-gray-900
      overflow-y-scroll
      h-screen 
      scrollbar-hide
      hidden 
      md:inline-flex
      sm:max-w-[12rem]
      lg:max-w-[15rem]"
    >
      <div className="space-y-4">
        <img src="https://groovelistapplication2.s3.amazonaws.com/GrooveList/Landing+Page/logo-transparente.png" className="w-auto h-12 mb-8 mt-2" />
        <Link to="/" className="flex space-x-2 items-center hover:text-white">
          <ImHome className="h-5 w-5" />
          <p>Home</p>
        </Link>
        {/* <Link
          to="/search"
          className="flex space-x-2 items-center hover:text-white"
        >
          <ImSearch className="h-5 w-5" />
          <p>Search</p>
        </Link> */}
        <Link
          to="/song-list"
          className="flex space-x-2 items-center hover:text-white"
        >
          <MdLibraryMusic className="h-5 w-5" />
          <p>Songs</p>
        </Link>
        <Link
          to="/album-list"
          className="flex space-x-2 items-center hover:text-white"
        >
          <RiFolderMusicFill className="h-5 w-5" />
          <p>Albums</p>
        </Link>
        <hr className="border-t-2 border-gray-500" />
        <Link
          to="/add-song"
          className="flex space-x-2 items-center hover:text-white"
        >
          <MdLibraryAdd className="h-5 w-5" />
          <p>Add song</p>
        </Link>
        <Link
          to="/add-album"
          className="flex space-x-2 items-center hover:text-white"
        >
          <FaFolderPlus className="h-5 w-5" />
          <p>Add album</p>
        </Link>
        <hr className="border-t-2 border-gray-500" />
        <p>My playlists</p>
        <ul className="space-y-2">
          {/* Add Links for each playlist */}
          <li>
            <Link to="/playlist/1" className="hover:text-white">
              playlist
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
