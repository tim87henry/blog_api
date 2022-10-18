const Navbar = () => {
    return(
        <div className="navbar">
            <ul className="navbarList">
                <li><a href="/">Home</a></li>
                <li>Login</li>
                <li><a href="/signup">Signup</a></li>
                <li>New Blog</li>
                <li>About</li>
            </ul>
        </div>
    )
};

export default Navbar;