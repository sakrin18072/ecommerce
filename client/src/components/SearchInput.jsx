import React from "react";
import { useSearch } from "../Contexts/SearchContext";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const SearchInput = () => {
    const [search,setSearch] = useSearch();
    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.get(`/api/v1/product/search/${search.key}`);
            setSearch({...search,result:data.products})
            navigate('/search');
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2 bg-dark text-light"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.key}
          onChange={(e)=>setSearch({...search,key:e.target.value})}
        />
        <button className="btn btn-outline-light" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
