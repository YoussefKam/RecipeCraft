// SearchBar.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/search?query=${query}`);
  };

  return (
    <div className="flex justify-center px-6 lg:px-0">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search by recipe title or ingredients"
        className="max-w-[600px] flex-grow py-4 rounded-l-full px-6 focus:outline-none"
      />
      <button
        onClick={handleSearchClick}
        className="py-4 bg-White text-DarkGreen rounded-r-full text-2xl px-6"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;

