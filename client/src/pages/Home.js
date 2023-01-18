import axios from 'axios';
import {useEffect, useState} from 'react';

const Home = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
            const res = await axios.get("http://localhost:5000/blogs");
            const docs = res.data;    
            setBlogs(docs);
            } catch (err) {
            const errorArray = err.response.data.errors.map((err) => {
                return { text: err.msg, type: "danger" };
            });
            }
        };
        fetchPosts();
    }, [0]);
    
    console.log(blogs.length)
    return(
        <div className="home">
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