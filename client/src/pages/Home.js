import axios from 'axios';
import {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [cookies] = useCookies([]);

    useEffect(() => {
        // refreshToken();
        // getUsers();
    }, []);
    
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/refresh');
            console.log("obtained token  :: "+JSON.stringify(response.data.access_token));
            setToken(response.data.access_token);
            const decoded = jwt_decode(response.data.access_token);
            console.log("decoded :: "+JSON.stringify(decoded));
            const currentDate = new Date();
            console.log("Datee :: "+currentDate.getTime())
            setName(decoded.first_name);
            console.log("Expire is set to "+decoded.exp)
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                console.log("ERROR "+error.response.data)
                console.log("TOKEN IS "+token)
                navigate("/");
            }
        }
    }

    // const axiosJWT = axios.create();

    // axiosJWT.interceptors.request.use(async (config) => {
    //     const currentDate = new Date();
    //     console.log("Exp :: "+expire * 1000 )
    //     console.log("Data :: "+currentDate.getTime())
    //     if (expire * 1000 < currentDate.getTime()) {
    //         const response = await axios.get('http://localhost:5000/refresh');
    //         config.headers.Authorization = `Bearer ${response.data.access_token}`;
    //         console.log("Interceptor 1 :: "+JSON.stringify(response.data.access_token))
    //         setToken(response.data.access_token);
    //         const decoded = jwt_decode(response.data.access_token);
    //         setName(decoded.name);
    //         setExpire(decoded.exp);
    //         console.log("Interceptor 2 :: "+JSON.stringify(decoded))
    //     }
    //     return config;
    // }, (error) => {
    //     return Promise.reject(error);
    // });

    // const getUsers = async () => {
    //     const response = await axiosJWT.get('http://localhost:5000/users', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     setUsers(response.data);
    // }

    console.log("HOME "+JSON.stringify(cookies))
    return(
        <div className="home">
            <h2>Hi {name}</h2>
            {blogs.map((blog) => (
                <div style={{ borderBottom: "1px solid #c5c5c5", paddingBottom: "8px" }} key={blog._id}>
                    <a href={"show/"+blog._id}><h3>{blog.title}</h3></a>
                    <p>{blog.text}</p>
                </div>
                ))}
        </div>
    )
};

export default Home;