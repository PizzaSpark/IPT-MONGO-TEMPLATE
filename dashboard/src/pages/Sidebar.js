import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, ViewList, Add } from "@mui/icons-material";

function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();

        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-items">
                <Link to="/dashboard">
                    <div className="sidebar-items-tile">
                        <Home />
                        <p>DASHBOARD</p>
                    </div>
                </Link>
                <Link to="/manage">
                    <div className="sidebar-items-tile">
                        <Add />
                        <p>MANAGE</p>
                    </div>
                </Link>
                <Link to="/">
                    <div className="sidebar-items-tile">
                        <ViewList />
                        <p>LOGOUT</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
