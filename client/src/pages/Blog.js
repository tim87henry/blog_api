import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Blog = () => {
    let {id} = useParams();
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const url = "http://localhost:5000/blogs/"+id+"/show";
                const res = await axios.get(url)
                const doc = res.data;
                setBlog(doc);
            } catch (err) {
                const errorArray = err.response.data.errors.map((err) => {
                    return { text: err.msg, type: "danger" };
                });
            }
            
        }
        fetchBlog();
    }, [id]);
    console.log(id)
    return (
        <div>
            <h4>{blog.title}</h4>
            <p>{blog.text}</p>
        </div>
    )
};

export default Blog;