import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";
import { getInfo,isAdmin } from "../Cookies";

const Header = () => {
    const navigate = useNavigate();
    const sideRef = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const openMenu = () => {
        sideRef.current.classList.toggle("mobile-menu");
        setOpen(!isOpen);
    };
    const closeNav = () => {
        sideRef.current.classList.remove("mobile-menu")
        setOpen(false);
    };
    const goToHome = () => {
        navigate("/");
        closeNav();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            <header>
                <h3 onClick={goToHome} className="logo">
                    <i className="bx bxl-shopify"></i>
                    Shopping-<span>Store</span>
                </h3>
                <div className="links">
                    <div className="search-area">
                        <input type="search" placeholder="Search..." />
                        <i className="bx bx-search"></i>
                    </div>
                    {getInfo() !== null && (
                        <>
                            <NavLink to="/">
                                <i className="bx bx-bell"></i>
                            </NavLink>
                            {!isAdmin()&&
                            <NavLink to="/">
                                <i className="bx bx-cart"></i>
                            </NavLink>
}
                            <NavLink to="/">
                                <i className="bx bx-user-circle"></i>
                            </NavLink>
                        </>
                    )}
                </div>
                <button onClick={openMenu} className="nav-btn">
                    <i className={isOpen ? "bx bx-x" : "bx bx-menu"}></i>
                </button>
            </header>
            <aside ref={sideRef}>
                <h3>Main Menu </h3>
                <div className="search-area">
                    <input type="search" placeholder="Search..." />
                    <i className="bx bx-search"></i>
                </div>
                <SidebarLinks closeNav={closeNav} />
            </aside>
        </>
    );
};

export default Header;
