import { Outlet } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/remixicon/remixicon.css";
import "../assets/css/Animation.css";
import "../assets/css/Layout.css";
import "../assets/css/Page.css";
import "../assets/css/responsive.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Layouts = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <>
            <Header />
            <main>
                <Outlet />
                <Footer />
            </main>
        </>
    );
};

export default Layouts;
