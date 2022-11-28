import axios from 'axios';
import {useRef} from "react";
import {Link} from "react-router-dom";

const Login = () => {

    const username_ref = useRef();
    const password_ref = useRef();
    const token = localStorage.getItem('token');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer cats');

    const userLogin = async () => {
        console.log("Gonna try")
        const data = {
            username: username_ref.current.value,
            password: password_ref.current.value
        }
        // axios.post("http://localhost:5000/users/login",{
        //     username: username_ref.current.value,
        //     password: password_ref.current.value
        // })
        // .then(function (response) {
        //     console.log(response.data);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        // let p = await fetch('http://localhost:5000/users/login',{
        //     mode: "cors",
        //     credentials: "same-origin",
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: data
        // })
        // console.log(await p.json())
        let p = await fetch('http://localhost:5000/users/login', {
            method: "POST",
            mode: "no-cors",
            credentials:"same-origin",
            headers: {
                Authorization: "Bearer cats"
            },
            body:JSON.stringify(data),
          });
          const result = await p.json();
          console.log(result)
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