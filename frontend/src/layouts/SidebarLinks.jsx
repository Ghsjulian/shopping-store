import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getInfo, isAdmin } from "../Cookies";

const SidebarLinks = ({ closeNav }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [path, setPath] = useState("");
    useEffect(() => {
        setPath(location.pathname);
    }, [location]);
    return (
        <div className="links">
            <NavLink
                onClick={closeNav}
                className={path == "/" ? "active" : ""}
                to="/"
            >
                <i className="bx bx-home"></i> <span>Home</span>
            </NavLink>

            {isAdmin() && getInfo().token && (
                <>
                    <NavLink
                        onClick={closeNav}
                        to="/admin/dashboard"
                        className={path == "/admin/dashboard" ? "active" : ""}
                    >
                        <i className="bx bx-grid-alt"></i>
                        Dashboard
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        to="/admin/profile"
                        className={path == "/profile" ? "active" : ""}
                    >
                        <i className="bx bx-shield"></i>
                        Profile
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        to="/admin/orders"
                        className={path == "/admin/orders" ? "active" : ""}
                    >
                        <i className="bx bx-bell"></i>
                        Notifications
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        to="/admin/add-product"
                        className={path == "/admin/add-product" ? "active" : ""}
                    >
                        <i className="bx bx-plus-circle"></i>
                        Add Product
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        to="/admin/all-products"
                        className={
                            path == "/admin/all-products" ? "active" : ""
                        }
                    >
                        <i className="bx bx-task"></i>
                        All Products
                    </NavLink>
                </>
            )}

            {getInfo().token !== null && !isAdmin() && (
                <>
                    <NavLink
                        onClick={closeNav}
                        className={path == "/profile" ? "active" : ""}
                        to="/profile"
                    >
                        <i className="bx bxs-user-circle"></i>{" "}
                        <span>Profile</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        className={path == "/notifications" ? "active" : ""}
                        to="/notifications"
                    >
                        <i className="bx bx-bell"></i>{" "}
                        <span>Notifications</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        className={path == "/cart" ? "active" : ""}
                        to="/cart"
                    >
                        <i className="bx bx-cart"></i> <span>Cart</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        className={path == "/orders" ? "active" : ""}
                        to="/orders"
                    >
                        <i className="bx bxs-shopping-bag"></i>{" "}
                        <span>Orders</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        className={path == "/delivery" ? "active" : ""}
                        to="/delivery"
                    >
                        <i className="bx bx-map-pin"></i> <span>Delivery</span>
                    </NavLink>
                </>
            )}
            <NavLink
                onClick={closeNav}
                className={path == "/latest-product" ? "active" : ""}
                to="/latest-product"
            >
                <i className="bx bx-closet"></i> <span>Latest Products</span>
            </NavLink>
            {!getInfo().token && (
                <>
                    <NavLink
                        onClick={closeNav}
                        className={path == "/login" ? "active" : ""}
                        to="/login"
                    >
                        <i className="bx bxs-lock"></i> <span>Login</span>
                    </NavLink>
                    <NavLink
                        onClick={closeNav}
                        className={path == "/signup" ? "active" : ""}
                        to="/signup"
                    >
                        <i className="bx bxs-user-plus"></i> <span>Signup</span>
                    </NavLink>
                </>
            )}
            {getInfo() !== null && (
                <NavLink
                    onClick={closeNav}
                    className={path == "/logout" ? "active" : ""}
                    to="/logout"
                >
                    <i className="bx bxs-log-in-circle"></i> <span>Logout</span>
                </NavLink>
            )}
            <NavLink
                onClick={closeNav}
                className={path == "/about-us" ? "active" : ""}
                to="/about-us"
            >
                <i className="bx bx-info-circle"></i> <span>About us</span>
            </NavLink>
            <NavLink
                onClick={closeNav}
                className={path == "/contact-us" ? "active" : ""}
                to="/contact-us"
            >
                <i className="bx bxs-phone"></i> <span>Contact us</span>
            </NavLink>
            <NavLink
                onClick={closeNav}
                className={path == "/report" ? "active" : ""}
                to="/report"
            >
                <i className="bx bx-bar-chart"></i> <span>Report</span>
            </NavLink>
        </div>
    );
};

export default SidebarLinks;
