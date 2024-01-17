import React from "react";
import Card from "../../components/card/Card";
import "./posts.css";

const Posts = () => {
  return (
    <div className="container">
      <div className="post-card p-3 row row-cols-1 row-cols-md-3 g-4">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Posts;
