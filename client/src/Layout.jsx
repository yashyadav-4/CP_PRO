import { Outlet, NavLink, Link } from "react-router-dom";


function Layout() {
    return (
        <>
            <nav>
                <Link to='/login'>Login</Link> | <Link to='/signup' > Signup</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout;