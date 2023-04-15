import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Title from './components/Title';
import './components/style.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Logout from './components/Logout';
import AddBlog from './components/AddBlog';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import Blog from './pages/Blog';
import axios from 'axios';

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
      getBlogs();
  }, []);

  const getBlogs = async () => {
    const response = await axios.get('http://localhost:5000/blogs');
    setBlogs(response.data)
  }

  const handleUserLoggedIn = (state) => {
    console.log("Handling state "+state)
    setUserLoggedIn(state);
  }
  
  // console.log("BLOGS ARE SET  TO  "+userLoggedIn)
  return (
    <div className="App">
      <BrowserRouter>
        <Title />
        <Navbar userLoggedIn={userLoggedIn} />
        <Routes>
          <Route path="/" 
          element={<Home 
          userLoggedIn={userLoggedIn} 
          blogs={blogs} 
          handleUserLoggedIn={handleUserLoggedIn}
          />} 
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login handleUserLoggedIn={handleUserLoggedIn} />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/show/:id" element={<Blog userLoggedIn={userLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;