const Navbar = ({userLoggedIn}) => {
    return(
        <div className="navbar">
            <ul className="navbarList">
                <li><a href="/">Home</a></li>
                {!userLoggedIn && <li><a href="/login">Login</a></li>}
                {!userLoggedIn && <li><a href="/signup">Signup</a></li>}
                <li><a href="/addblog">New Blog</a></li>
                <li>About</li>
                {userLoggedIn && <li><a href="/logout">Logout</a></li>}
            </ul>
        </div>
    )
};

export default Navbar;