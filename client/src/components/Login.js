import axios from 'axios';
import React, {useEffect, useRef, useState} from "react";
import { UNSAFE_DataStaticRouterContext, useNavigate } from 'react-router-dom';

const Login = ({setUserLoggedIn}) => {

    const username_ref = useRef();
    const password_ref = useRef();
    const navigate = useNavigate(); 
    const [loginErr, setLoginErr] = useState({ hasError: false, errMsg: ""});
    const [passwd, setPasswd] = useState("");

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
            navigate("/");
        } else {
            setLoginErr({ hasError: true, errMsg: result1.data.message })
            setPasswd("")
        }
        
    }
    
    return(
        <div className="logInForm">
            Username <input type="text" name="username" ref={username_ref}></input><br/>
            Password <input type="password" name="password" ref={password_ref} value={passwd} onChange={(e)=> setPasswd(e.target.value)}></input><br/>
            <input type="button" onClick={userLogin} value="Login" />
            {loginErr.hasError &&
            <div>
                <i>{loginErr.errMsg}</i>
            </div>
            }
        </div>
    )
};

export default Login;