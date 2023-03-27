import axios from 'axios';
import {useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const Home = () => {

    const [blogs, setBlogs] = useState([]);
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // const fetchPosts = async () => {
        //     try {
        //     const res = await axios.get("http://localhost:5000/blogs");
        //     const docs = res.data;    
        //     setBlogs(docs);
        //     } catch (err) {
        //     const errorArray = err.response.data.errors.map((err) => {
        //         return { text: err.msg, type: "danger" };
        //     });
        //     }
        // };
        // fetchPosts();
        refreshToken();
        // getUsers();
    }, []);
    
    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/refresh');
            console.log("obtained token  :: "+JSON.stringify(response.data.access_token));
            setToken(response.data.access_token);
            const decoded = jwt_decode(response.data.access_token);
            console.log("decoded :: "+JSON.stringify(decoded));
            setName(decoded.first_name);
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
    //     if (expire * 1000 < currentDate.getTime()) {
    //         const response = await axios.get('http://localhost:5000/refresh');
    //         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    //         setToken(response.data.accessToken);
    //         const decoded = jwt_decode(response.data.accessToken);
    //         setName(decoded.name);
    //         setExpire(decoded.exp);
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

    console.log(blogs.length)
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