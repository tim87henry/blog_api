import axios from 'axios';
import {useRef} from "react";
import {Link} from "react-router-dom";

const Signup = () => {

    const first_name_ref = useRef();
    const last_name_ref = useRef();
    const username_ref = useRef();
    const password_ref = useRef();

    const addUser = () => {
        axios.post("http://localhost:5000/users/add",{
            first_name: first_name_ref.current.value,
            last_name: last_name_ref.current.value,
            username: username_ref.current.value,
            password: password_ref.current.value
        })
        .then(function (response) {
            console.log("HMmm");
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className="signUpForm">
            First name <input type="text" name="first_name" ref={first_name_ref}></input><br/>
            Last name <input type="text" name="last_name" ref={last_name_ref}></input><br/>
            Username <input type="text" name="username" ref={username_ref}></input><br/>
            Password <input type="text" name="password" ref={password_ref}></input><br/>
            <Link to="/">
                <input type="button" onClick={addUser} value="Sign Up" />
            </Link>
        </div>
    )
};

export default Signup;