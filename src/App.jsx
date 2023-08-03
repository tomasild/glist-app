import React from "react";
import SideBar from "./components/SideBar";
import Center from "./components/Center";
import { useRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlbumList from "./pages/AlbumList";
import SongList from "./pages/SongList";
import AlbumDetails from "./pages/AlbumDetails";
import AddAlbumForm from "./forms/AddAlbumForm";
import AddSongForm from "./forms/AddSongForm";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Center pageTitle="Home"><Home /></Center> },
    { path: "/song-list", element: <Center pageTitle="Song List"><SongList /></Center> },
    { path: "/album-list", element: <Center pageTitle="Album List"><AlbumList /></Center> },
    { path: "/album/:albumId", element: <AlbumDetails /> },
    { path: "/add-album", element: <AddAlbumForm /> },
    { path: "/add-song", element: <AddSongForm /> },
  ]);

  return (
    <div className="bg-black h-screen">
      <main className="flex">
        <SideBar />
        {routes}
      </main>
    </div>
  );
}

export default App;
