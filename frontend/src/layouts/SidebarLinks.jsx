import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SidebarLinks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath(location.pathname);
    }, [location]);
    return (
        <div className="links">
            <NavLink className={path == "/" ? "active" : ""} to="/">
                <i className="bx bx-home"></i> <span>Home</span>
            </NavLink>
            <NavLink
                className={path == "/profile" ? "active" : ""}
                to="/profile"
            >
                <i className="bx bxs-user-circle"></i> <span>Profile</span>
            </NavLink>
            <NavLink
                className={path == "/notifications" ? "active" : ""}
                to="/notifications"
            >
                <i className="bx bx-bell"></i> <span>Notifications</span>
            </NavLink>
            <NavLink className={path == "/cart" ? "active" : ""} to="/cart">
                <i className="bx bx-cart"></i> <span>Cart</span>
            </NavLink>
            <NavLink className={path == "/orders" ? "active" : ""} to="/orders">
                <i className="bx bxs-shopping-bag"></i> <span>Orders</span>
            </NavLink>
            <NavLink
                className={path == "/delivery" ? "active" : ""}
                to="/delivery"
            >
                <i className="bx bx-map-pin"></i> <span>Delivery</span>
            </NavLink>
            <NavLink
                className={path == "/latest-products" ? "active" : ""}
                to="/latest-products"
            >
                <i className="bx bx-closet"></i> <span>Latest Products</span>
            </NavLink>
            <NavLink className={path == "/login" ? "active" : ""} to="/login">
                <i className="bx bxs-lock"></i> <span>Login</span>
            </NavLink>
            <NavLink className={path == "/signup" ? "active" : ""} to="/signup">
                <i className="bx bxs-user-plus"></i> <span>Signup</span>
            </NavLink>
            <NavLink className={path == "/logout" ? "active" : ""} to="/logout">
                <i className="bx bxs-log-in-circle"></i> <span>Logout</span>
            </NavLink>
            <NavLink
                className={path == "/about-us" ? "active" : ""}
                to="/about-us"
            >
                <i className="bx bx-info-circle"></i> <span>About us</span>
            </NavLink>
            <NavLink
                className={path == "/contact-us" ? "active" : ""}
                to="/contact-us"
            >
                <i className="bx bxs-phone"></i> <span>Contact us</span>
            </NavLink>
            <NavLink className={path == "/report" ? "active" : ""} to="/report">
                <i className="bx bx-bar-chart"></i> <span>Report</span>
            </NavLink>
        </div>
    );
};

export default SidebarLinks;
