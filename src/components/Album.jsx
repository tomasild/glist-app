import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function Album({ title, year, _id, updatedAt, createdAt }) {
  return (
    <Link to={`/album/${_id}`} className="no-underline">
      <Card
        title={title}
        year={year}
        imageSrc="../public/assets/glist logo.jpeg"
        _id={_id}
        updated={updatedAt}
        created={createdAt}
      />
    </Link>
  );
}

export default Album;
