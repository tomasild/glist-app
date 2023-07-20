import React from "react";
import SideBar from "./components/SideBar";
import Center from "./components/Center";
import MusicPlayer from "./components/MusicPlayer";
import Home from "./pages/Home";
import AlbumList from './pages/AlbumList'


function App() {
  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <SideBar />
        <Center />
      </main>
      <div className="absolute b-0 w-full text-white ">
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
