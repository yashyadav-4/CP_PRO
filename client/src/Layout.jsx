import { Outlet, NavLink, Link } from "react-router-dom";
import MeteorShower from "./components/MeteorShower";


function Layout() {
    return (
        <>
            <MeteorShower />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', minHeight: '100vh', zIndex: 10 }}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout;