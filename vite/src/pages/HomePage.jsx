import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import PostCard from "../components/PostCard";
import PostContext from "../context/PostContext";

const HomePage = () => {
  let { user } = useContext(AuthContext);
  let { Posts } = useContext(PostContext);

  return (
    <div className="grid grid-cols-1 divide-y  border-x-2">
      <h3 className="p-2">Home</h3>

      <br />
      <div>
        <br />
        {Posts.map((post) => (
          <li key={post.id} style={{ listStyle: "none" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PostCard data={post} />
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
