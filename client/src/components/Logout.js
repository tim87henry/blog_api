import axios from 'axios';
import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";

const Logout = () => {

    useEffect(() => {
        localStorage.removeItem('token');
    });

    return(
        <h5>Logged out</h5>
    )
};

export default Logout;