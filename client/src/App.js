import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Title from './components/Title';
import './components/style.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Logout from './components/Logout';
import AddBlog from './components/AddBlog';
import Home from './pages/Home';
import { useEffect, useState, useRef } from 'react';
import Blog from './pages/Blog';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [expire, setExpire] = useState('');
  // const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [cookies] = useCookies([]);


  useEffect(() => {
      console.log("Re-effected ::  "+userLoggedIn)
      refreshToken();
      getBlogs();
  }, [0]);

  const getBlogs = async () => {
    const response = await axios.get('http://localhost:5000/blogs');
    setBlogs(response.data)
  }

  const handleUserLoggedIn = (state) => {
    console.log("Handling state "+state)
    setUserLoggedIn(state);
  }
  
  const refreshToken = async () => {
    console.log("Is it actually passed down????   "+JSON.stringify(cookies))
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get('http://localhost:5000/refresh');
        console.log("obtained token  :: "+JSON.stringify(response.data.access_token));
        setToken(response.data.access_token);
        const decoded = jwt_decode(response.data.access_token);
        console.log("decoded :: "+JSON.stringify(decoded));
        setName(decoded.first_name);
        setUserLoggedIn(true);
        // handleUserLoggedIn(true);
        // handleUserLoggedIn(true);
        console.log("Expire is set to "+decoded.exp)
        setExpire(decoded.exp);
        const currentDate = new Date();
        if (expire * 1000 > currentDate.getTime()) {
            console.log("TOKEN EXPIRED!!!! RELOGIN AGAIN")
            // handleUserLoggedIn(false);
            setUserLoggedIn(false);
        }
    } catch (error) {
        if (error.response) {
            console.log("ERROR "+error.response.data)
            console.log("TOKEN IS "+token)
            // navigate("/");
        }
    }
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
          name={name}
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