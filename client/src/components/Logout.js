import axios from 'axios';
import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import { useCookies } from 'react-cookie';


const Logout = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['refresh_token']);
    useEffect(() => {
        localStorage.removeItem('token');
        removeCookie('refresh_token');
        console.log("Removed :: "+JSON.stringify(cookies))
    });

    return(
        <h5>Logged out</h5>
    )
};

export default Logout;