import axios from 'axios';
import {useRef} from "react";
import {Link} from "react-router-dom";

const Login = () => {

    const username_ref = useRef();
    const password_ref = useRef();

    const userLogin = () => {
        // axios.get("http://localhost:5000/users")
        // .then(res => {
        //     let found_user = res.data.find(user => user.username === username_ref.current.value);
        //     if (found_user && found_user.password === password_ref.current.value) {
        //         console.log("Logged in")
        //     } else if (found_user) {
        //         console.log("Wrong password bugger")
        //     } else {
        //         console.log("NAY")
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        
        axios.post("http://localhost:5000/users/login",{
            username: username_ref.current.value,
            password: password_ref.current.value
        })
        .then(function (response) {
            console.log(response);
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