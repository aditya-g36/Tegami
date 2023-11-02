import React, { useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    handleSearch(inputValue);
  };

  return (
    <div className="flex justify-center pt-2 ml-7 sticky top-0">
      <form className="relative ">
        <input
          type="text"
          placeholder="Search"
          className="py-2 pr-4 pl-4 rounded-full w-80 bg-gray-100 bg-zinc-800	text-white focus:outline-none focus:ring-0 focus:border-transparent "
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBar;
