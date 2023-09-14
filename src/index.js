// if we write npm start, it runs the index.js file
// if we write npm run backend it starts nodemon index.js
// npm run frontend is used to start the react app
// npm run both to run front and back end
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
