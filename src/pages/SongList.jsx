import React from 'react';
import Song from "../components/Song";


function SongList({ songs }) {
  return (
    
    <div className="text-white m-5 animate-slideup">
      <h2 className="mb-4 ml-2">Songs List</h2>
      <ul className="space-y-1">
        {/* {songs.map((song) => (
          <li key={song.id}>
            <Song />
          </li>
        ))} */}
        <Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song /><Song />
      </ul>
    </div>
  );
}

export default SongList;
