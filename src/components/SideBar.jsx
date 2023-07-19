import React from "react";
import { ImHome, ImSearch, ImFolderPlus } from "react-icons/im";
import { MdLibraryMusic, MdLibraryAdd, MdAlbum } from "react-icons/md";

function SideBar() {
  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide hidden md:inline-flex">
      <div className="space-y-4">
        <img src="./src/assets/glist logo nobg.png" className="w-20 h-20" />
        <button className="flex space-x-2 items-center hover:text-white">
          <ImHome className="h-5 w-5" /> 
          <p>Home</p>
        </button>
        <button className="flex space-x-2 items-center hover:text-white">
          <ImSearch className="h-5 w-5" /> 
          <p>Search</p>
        </button>
        <button className="flex space-x-2 items-center hover:text-white">
          <MdLibraryMusic className="h-5 w-5" /> 
          <p>Library</p>
        </button>

        <hr className="border-t-2 border-gray-500" />

        <button className="flex space-x-2 items-center hover:text-white">
          <MdLibraryAdd className="h-5 w-5" /> 
          <p>Add song</p>
        </button>
        <button className="flex space-x-2 items-center hover:text-white">
          <ImFolderPlus className="h-5 w-5" /> 
          <p>Add album</p>
        </button>

        <hr className="border-t-2 border-gray-500" />

        <p>My playlists</p>
        <ul className="space-y-2">
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
          <li>
            <p className="hover:text-white">playlist</p>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default SideBar;
