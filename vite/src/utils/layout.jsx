import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/SearchBar";

const layout = () => {
  return (
    <div className="flex ">
      <div className="fixed basis-1/7 ">
        <Sidebar />
      </div>
      <div className="ml-72 basis-3/5">
        <Outlet />
      </div>
      <div className="basis-1/4 ">
        <SearchBar />
      </div>
    </div>
  );
};

export default layout;
