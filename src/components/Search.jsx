import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/tasks?name=${searchQuery}`);
        setResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchQuery]);



  // <p>{record.name}</p>

  return (
    <div>
      <div className="search-element">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="Search-btn" type="submit">Search</button>
      </div>

      <div className="results">
        {results.map((record) => (
          <div className="result" key={record._id}>
            {}
            {<p>{record.name}</p>} 
          </div>
        ))}
      </div>
    </div>
  );

}

export default Search;
