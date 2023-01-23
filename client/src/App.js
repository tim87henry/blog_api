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

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if(userToken) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
    console.log(userToken)
  },[])

  return (
    <div className="App">
      <BrowserRouter>
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