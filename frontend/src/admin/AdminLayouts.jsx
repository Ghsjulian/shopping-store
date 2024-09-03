import Header from "./components/Header";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom"; // import "aos/dist/aos.css"
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/remixicon/remixicon.css";
import "./styles/admin-layout.css";

const AdminLayouts = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
        <div class="main-container">
            <h2>Admin Dashboard</h2>
        </div>
    );
};

export default AdminLayouts;
