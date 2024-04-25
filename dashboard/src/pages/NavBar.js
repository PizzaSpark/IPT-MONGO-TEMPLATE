import React from "react";
import { Link } from "react-router-dom";
import { LocalLibrarySharp } from "@mui/icons-material";

function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar-items">

                <div className="navbar-items-tile">
                    <LocalLibrarySharp />
                    <p>Your Local Library</p>
                </div>

                <Link to="/">
                    <div className="navbar-items-tile">
                        <p>LOGOUT</p>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default NavBar;
