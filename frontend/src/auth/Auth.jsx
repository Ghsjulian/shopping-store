import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie,isAdmin } from "../Cookies";

export const Islogin = ({ children }) => {
    const cookie = getCookie("user");
    const navigate = useNavigate();
    useEffect(() => {
        if (cookie && cookie !== null) {
            if(isAdmin()){
            navigate("/admin");
            }else {
            navigate("/");
            }
        }
    }, [cookie]);
    return !cookie && cookie !== null && children;
};
export const getCurrency =(type,price)=>{
    if(type==="encode") {
        return price+"TK BDT"
    }else {
        return price
    }
}