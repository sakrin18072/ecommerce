import React from "react";
import { useSearch } from "../Contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${search.key}`);
      setSearch({ ...search, result: data.products });
      navigate("/search");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex rounded-md shadow-sm ">
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.key}
          onChange={(e) => setSearch({ ...search, key: e.target.value })}
          id="hs-search-box-with-loading-4"
          name="hs-search-box-with-loading-4"
          className="py-2.5 px-4 block w-full shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 "
        />
        <button
          type="button"
          onClick={
            handleSubmit
          }
          className="py-2.5 px-4 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
