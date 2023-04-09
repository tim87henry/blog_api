import axios from 'axios';
import {useRef} from "react";
import {Link} from "react-router-dom";
import { useCookies } from 'react-cookie';

const AddBlog = () => {

    const title_ref = useRef();
    const text_ref = useRef();
    const [cookies, setCookie, removeCookie] = useCookies(['refresh_token']);

    const addBlog = () => {
        console.log("From local storage blog add :: "+localStorage.getItem('token'))
        axios.post("http://localhost:5000/blogs/add",{
            title: title_ref.current.value,
            text: text_ref.current.value,
            token: cookies['refresh_token']
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className="addBlogForm">
            Title <input type="text" name="title" ref={title_ref}></input><br/>
            Text <input type="text" name="text" ref={text_ref}></input><br/>
            <Link to="#">
                <input type="button" onClick={addBlog} value="Create blog" />
            </Link>
        </div>
    )
};

export default AddBlog;