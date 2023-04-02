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
import jwt_decode from 'jwt-decode';
import { useCookies } from "react-cookie";

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cookies] = useCookies([]);
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
      console.log("Has the bugger logged in ?? "+JSON.stringify(cookies))
      console.log("EXP000 :: "+JSON.stringify(expire))
      refreshToken();
      console.log("EXP111 :: "+JSON.stringify(expire))
      // getUsers();
  }, []);
  
  const refreshToken = async () => {
      try {
          console.log("INSIDE")
          axios.defaults.withCredentials = true;
          const response = await axios.get('http://localhost:5000/refresh');
          console.log("obtained token  :: "+JSON.stringify(response.data.access_token));
          setToken(response.data.access_token);
          const decoded = jwt_decode(response.data.access_token);
          console.log("decoded :: "+JSON.stringify(decoded));
          const currentDate = new Date();
          console.log("Datee :: "+currentDate.getTime())
          setName(decoded.first_name);
          setExpire(decoded.exp);
          setUserLoggedIn(true);
      } catch (error) {
          if (error.response) {
              console.log("ERROR "+JSON.stringify(error.response))
              console.log("TOKEN IS "+token)
          }
      }
  }

  const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        console.log("Exp :: "+expire * 1000 )
        console.log("Data :: "+currentDate.getTime())
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/refresh');
            config.headers.Authorization = `Bearer ${response.data.access_token}`;
            console.log("Interceptor 1 :: "+JSON.stringify(response.data.access_token))
            setToken(response.data.access_token);
            const decoded = jwt_decode(response.data.access_token);
            setName(decoded.name);
            setExpire(decoded.exp);
            console.log("Interceptor 2 :: "+JSON.stringify(decoded))
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

  return (
    <div className="App">
      <BrowserRouter>
      <h6>Hello {name}</h6>
        <Title />
        <Navbar userLoggedIn={userLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/show/:id" element={<Blog userLoggedIn={userLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;