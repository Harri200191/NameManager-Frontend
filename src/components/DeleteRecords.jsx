import React, { useEffect } from 'react';
import axios from 'axios';
import { URL } from '../App';

const DatabaseClear = () => {
  useEffect(() => {
    axios.get(`${URL}/`)
      .then((response) => {
        console.log(response.data.message); // Log the response message
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
    </div>
  );
}

export default DatabaseClear;
