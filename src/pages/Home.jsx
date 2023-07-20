import React from 'react';
import AlbumList from './AlbumList';


function Home() {
  return (
    <div className="flex-grow text-white overflow-y-scroll h-screen scrollbar-hide animate-slowfade">
      <section className="w-full flex items-end space-x-7 bg-gradient-to-b to-black from-orange-950 h-64 text-white font-bold p-8">
        
      </section>
      <div>
        <AlbumList />
      </div>
    </div>
  );
}

export default Home;
