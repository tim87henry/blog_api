import axios from 'axios';
import React, {useEffect, useRef, useState} from "react";
import { UNSAFE_DataStaticRouterContext, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

const Login = (props) => {

    const username_ref = useRef();
    const password_ref = useRef();
    const navigate = useNavigate(); 
    const [cookies] = useCookies([]);
    const [loginErr, setLoginErr] = useState({ hasError: false, errMsg: ""});
    const [passwd, setPasswd] = useState("");
    const handleUserLoggedIn = props.handleUserLoggedIn;

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer cats');

    const userLogin = async () => {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        const result = axios("http://localhost:5000/users/login", {
            method: 'POST',
            data: {
                    username: username_ref.current.value,
                    password: password_ref.current.value
                },
            withCredentials: true
          })
        // console.log("Result is "+JSON.stringify(result))
        handleUserLoggedIn(true);
        navigate("/");
        
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