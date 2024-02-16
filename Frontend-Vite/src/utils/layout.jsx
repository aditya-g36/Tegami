import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";
import useAxios from "../utils/useAxios";
import Widgets from "../components/Widgets";

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
    <div className="flex bg-[#000000] mx-auto">
      <div className="bg-[#000000]">
        <Sidebar />
      </div>
      <div className="ml-16 lg:ml-96 min-w-[600px] max-w-[600px] bg-[#000000]">
        <Outlet />
      </div>
      <div className="w-1/4 bg-[#000000]">
        <SearchBar handleSearch={handleSearch} />
        <br />
        <UserList users={searchResults} />
        <Widgets />
      </div>
    </div>
  );
};

export default layout;
