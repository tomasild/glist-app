import React from "react";
import Card from "./Card";

function Album({ title, year, _id, updatedAt, createdAt }) {
  return (
    <Card
      title={title}
      year={year}
      imageSrc="./src/assets/glist logo.jpeg"
      _id={_id}
      updated={updatedAt}
      created={createdAt}
    />
  );
}

export default Album;
