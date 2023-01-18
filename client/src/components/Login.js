import axios from 'axios';
import {useRef} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const username_ref = useRef();
    const password_ref = useRef();
    // const token = localStorage.getItem('token');
    const navigate = useNavigate(); 

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer cats');

    const userLogin = async () => {
        console.log("Gonna try")
        const result = axios.post("http://localhost:5000/users/login",{
            username: username_ref.current.value,
            password: password_ref.current.value
        })
        const result1 = await result;
        console.log(result1.data.loggedIn? "Correct user": "Bugger off bozo")
        if (result1.data.loggedIn) {
            localStorage.setItem('token', result1.data.token)
        }
        console.log("From local storage :: "+localStorage.getItem('token'))
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