import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import useAxios from "../utils/useAxios";

const layout = () => {
  let api = useAxios();
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    api
      .get(`/api/search/?q=${query}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="flex ">
      <div className="fixed basis-1/7 ">
        <Sidebar />
      </div>
      <div className="ml-72 basis-3/5">
        <Outlet />
      </div>
      <div className="basis-1/4 ">
        <SearchBar handleSearch={handleSearch} />
        <br />
        <UserList users={searchResults} />
      </div>
    </div>
  );
};

export default layout;
