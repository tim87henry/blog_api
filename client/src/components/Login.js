import axios from 'axios';
import {useRef} from "react";
import {Link} from "react-router-dom";

const Login = () => {

    const username_ref = useRef();
    const password_ref = useRef();

    const userLogin = () => {
        axios.post("http://localhost:5000/users/login",{
            username: username_ref.current.value,
            password: password_ref.current.value
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    

    return(
        <div className="logInForm">
            Username <input type="text" name="username" ref={username_ref}></input><br/>
            Password <input type="text" name="password" ref={password_ref}></input><br/>
            <Link to="/login">
                <input type="button" onClick={userLogin} value="Login" />
            </Link>
        </div>
    )
};

export default Login;