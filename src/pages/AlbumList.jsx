import React from 'react';
import Album from '../components/Album';


function AlbumList({ albums }) {
  return (
    <div className="text-white m-5 animate-slideup">
      <h2 className="mb-4 ml-2">Albums List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* {albums.map((album) => (
          <li key={album.id}>
            <Album />
          </li>
        ))} */}
        <Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album /><Album />
      </ul>
    </div>
  );
}

export default AlbumList;
