import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Title from './components/Title';
import './components/style.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Logout from './components/Logout';
import AddBlog from './components/AddBlog';
import { useEffect, useState } from 'react';

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if(userToken) {
      console.log("True section")
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
    console.log("user logged in ")
    console.log(userToken)
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Title />
        <Navbar userLoggedIn={userLoggedIn}/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;