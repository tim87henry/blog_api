import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Blog = ({userLoggedIn}) => {

    let {id} = useParams();
    const text_ref = useRef();
    const [blog, setBlog] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const url = "http://localhost:5000/blogs/"+id+"/show";
                const res = await axios.get(url)
                const doc = res.data;
                setBlog(doc);
            } catch (err) {
                err.response.data.errors.map((err) => {
                    return { text: err.msg, type: "danger" };
                });
            }
            
        }
        fetchBlog();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const url = "http://localhost:5000/comments/show";
                const res = await axios.get(url, { params: { blog: blog}})
                const doc = res.data;
                setComments(doc);
            } catch (err) {
                err.response.data.errors.map((err) => {
                    return { text: err.msg, type: "danger" };
                });
            }
            
        }
        fetchComments();
    }, []);
    
    const addComment = () => {
        console.log("From local storage blog add :: "+localStorage.getItem('token'))
        axios.post("http://localhost:5000/comments/add",{
            blog: blog,
            text: text_ref.current.value,
            token: localStorage.getItem('token')
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <h4>{blog.title}</h4>
            <p>{blog.text}</p><br/>
            {userLoggedIn && 
            <div className="addCommentForm">
                <label>Add a Comment</label><br/><br/>
                <textarea type="text" name="text" ref={text_ref}></textarea><br/><br/>
                <Link to="#">
                    <input type="button" onClick={addComment} value="Add comment" />
                </Link>
            </div>
            }
        </div>
    )
};

export default Blog;