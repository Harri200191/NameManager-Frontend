// if we write npm start, it runs the index.js file
// if we write npm run backend it starts nodemon index.js
// npm run frontend is used to start the react app
// npm run both to run front and back end

import Tasklist from "./components/Tasklist";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from "./components/Search";

export const URL = process.env.REACT_APP_SERVER_URL

function App() {
  return (
    <div className="app">
      <div className="search-area">
        <Search/>
      </div>
      <div className="task-container">
          <Tasklist/>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
