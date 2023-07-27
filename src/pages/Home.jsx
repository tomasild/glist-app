import React from "react";
import AlbumList from "./AlbumList";

function Home() {
  return (
    <div className="flex-grow text-white overflow-y-scroll h-screen scrollbar-hide">
      <div>
        <AlbumList />
      </div>
    </div>
  );
}

export default Home;
