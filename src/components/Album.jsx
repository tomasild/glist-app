import React from "react";
import Card from "./Card"; // Assuming both components are in the same directory

function Album() {
  
  const albumData = {
    title: "Album Name",
    year: "Year",
    imageSrc: "./src/assets/glist logo.jpeg",
    id: "ID",
    updated: "Updated Date",
    created: "Created Date",
  };

  return (
    <Card
      title={albumData.title}
      year={albumData.year}
      imageSrc={albumData.imageSrc}
      id={albumData.id}
      updated={albumData.updated}
      created={albumData.created}
    />
  );
}

export default Album;
