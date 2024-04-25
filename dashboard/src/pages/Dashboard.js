import React from "react";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

function Dashboard() {
    return (
        <div className="container">
            <Sidebar />
            <div className="content">
                <h1>Welcome to Saint Mary's University</h1>
            </div>
        </div>
    );
}

export default Dashboard;
