import axios from 'axios';
import React, {useRef} from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({setUserLoggedIn}) => {

    const username_ref = useRef();
    const password_ref = useRef();
    const navigate = useNavigate(); 

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer cats');

    const userLogin = async () => {
        const result = axios.post("http://localhost:5000/users/login",{
            username: username_ref.current.value,
            password: password_ref.current.value
        })
        const result1 = await result;
        if (result1.data.loggedIn) {
            localStorage.setItem('token', result1.data.token)
            setUserLoggedIn(true)
        }
        navigate("/");
    }
    
    return(
        <div className="logInForm">
            Username <input type="text" name="username" ref={username_ref}></input><br/>
            Password <input type="password" name="password" ref={password_ref}></input><br/>
            <input type="button" onClick={userLogin} value="Login" />
        </div>
    )
};

export default Login;