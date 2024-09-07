import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, isAdmin } from "../../Cookies";

const AdminAuth = () => {
    const navigate = useNavigate();
    const cookie = getCookie("user");
    useEffect(() => {
        if (!isAdmin() && cookie.user_type !== "Admin") {
            navigate("/login");
        }
    }, [cookie, isAdmin()]);
    return isAdmin() && cookie !== null && children;
};

export { AdminAuth}
