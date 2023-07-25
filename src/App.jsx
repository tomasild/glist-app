import React from "react";
import SideBar from "./components/SideBar";
import Center from "./components/Center";
import MusicPlayer from "./components/MusicPlayer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumList from "./pages/AlbumList";
import SongList from "./pages/SongList";


function App() {
  

  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/song-list" element={<Center> <SongList /> </Center>} />
          <Route path="/album-list" element={<Center> <AlbumList /> </Center>} />
        </Routes>
      </main>
      <div className="absolute b-0 w-full text-white">
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
