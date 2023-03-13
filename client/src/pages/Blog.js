import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";
import { borderTop } from "@mui/system";

const Blog = ({userLoggedIn}) => {

    let {id} = useParams();
    const text_ref = useRef();
    const [blog, setBlog] = useState({post:[], comments:[]});
    const [hasLoaded, setHasLoaded] = useState(false);

    const getData = async () => {
        try {
            setHasLoaded(false)
            let [getBlogs, getComments] = await Promise.all([
                axios.get("http://localhost:5000/blogs/"+id+"/show"),
                axios.get("http://localhost:5000/comments/"+id+"/show")
            ]);
            // console.log("Blogs are :: "+JSON.stringify(getBlogs.data))
            setBlog({post: getBlogs.data, comments: getComments.data})
            setHasLoaded(true)
            console.log("Comments are :: "+JSON.stringify(getComments.data))
        } catch(err) {
            console.log("Error :: "+err)
        }
    }

    useEffect(() => {
        getData();
    }, []);
    
    const addComment = () => {
        // console.log("From local storage blog add :: "+localStorage.getItem('token'))
        axios.post("http://localhost:5000/comments/add",{
            blog: blog.post,
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
            <Typography variant="h4">{blog.post.title}</Typography>
            <Typography variant="subtitle2">{blog.post.text}</Typography><br/>
            {hasLoaded &&
            <div>
                <br></br>
                <h3><i>Comments</i></h3>
                {blog.comments.map((c) => {
                    return <div id={c._id}><h5>{c.username}</h5> <p>{c.comment.text}</p> </div>
                })}
            </div>
            }
            {userLoggedIn && 
            <div className="addCommentForm">
                <label>Add a Comment</label><br/><br/>
                {/* <textarea type="text" name="text" ref={text_ref}></textarea><br/><br/> */}
                <TextField multiline rows={3}></TextField>
                <br/><br/>
                <Link to="/">
                    <Button variant="contained" size="small" onClick={addComment}>Add comment</Button>
                </Link>
            </div>
            }
        </div>
    )
};

export default Blog;