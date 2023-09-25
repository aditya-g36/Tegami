import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    handleSearch(inputValue);
  };

  return (
    <div className="flex justify-center pt-2">
      <form className="relative">
        <input
          type="text"
          placeholder="Search"
          className="py-2 pr-4 pl-4 rounded-full w-80 bg-gray-100 text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
