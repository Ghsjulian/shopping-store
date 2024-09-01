import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <strong>Shopping-Store LTD.</strong>
             <strong>
                Developed By -
                <NavLink to="https://ghsresume.netlify.app" target="_blank">
                    Ghs Julian
                </NavLink>
            </strong>
            <strong>
                © Copyright All Reserve <span>2020-2024</span>
            </strong>
        </footer>
    );
};

export default Footer;
