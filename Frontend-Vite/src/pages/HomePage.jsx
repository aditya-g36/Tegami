import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import PostCard from "../components/PostCard";
import PostContext from "../context/PostContext";

const HomePage = () => {
  let { user } = useContext(AuthContext);
  let { Posts } = useContext(PostContext);

  return (
    <div className="border-x-[0.5px] border-slate-700 bg-[#000000]">
      <h3
        className="p-2 text-white border-b-[0.5px] border-slate-700 font-semibold sticky top-0 backdrop-blur-sm bg-[#000000] bg-opacity-70"
        style={{ margin: 0, padding: 0 }}
      >
        Home
      </h3>
      <div className="bg-[#000000] ">
        {Posts.map((post) => (
          <li
            key={post.id}
            style={{ listStyle: "none" }}
            className="bg-[#000000] border-[0.5px] border-slate-700"
          >
            <div
              style={{
                display: "flex",
              }}
              className="bg-[#000000]"
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
