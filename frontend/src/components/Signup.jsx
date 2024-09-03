import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import { setCookie } from "../Cookies";

const Signup = () => {
    document.title =
        "Create Your Account | Signup Now | Shopping Cart E Commerce";
    const host = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const msgRef = useRef(null);
    const loaderRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const showMessage = (type, msg) => {
        if (type) {
            msgRef.current.style.display = "block";
            msgRef.current.textContent = msg;
        } else {
            msgRef.current.style.display = "block";
            msgRef.current.textContent = msg;
        }
        setTimeout(() => {
            msgRef.current.style.display = "none";
            msgRef.current.textContent = "";
        }, 3000);
    };

    const signup = async e => {
        e.preventDefault();
        if (!username.trim() && !email.trim() && !password.trim()) {
            msgRef.current.classList.remove("success");
            msgRef.current.classList.add("error");
            showMessage(false, "Please Enter Your Information!");
            return;
        } else if (!username.trim()) {
            msgRef.current.classList.remove("success");
            msgRef.current.classList.add("error");
            showMessage(false, "Please Enter User Name!");
            return;
        } else if (!email.trim()) {
            msgRef.current.classList.remove("success");
            msgRef.current.classList.add("error");
            showMessage(false, "Please Enter User Email Address!");
            return;
        } else if (!password.trim()) {
            msgRef.current.classList.remove("success");
            msgRef.current.classList.add("error");
            showMessage(false, "Please Enter User Password!");
            return;
        } else {
            try {
                setLoading(true);
                const user = {
                    username,
                    email,
                    password
                };
                const sendData = await fetch(host + "/signup", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(user)
                });
                const response = await sendData.json();
                setLoading(false);
                if (response.type) {
                    msgRef.current.classList.remove("error");
                    msgRef.current.classList.add("success");
                    showMessage(true, response.success);
                    const cookie = JSON.stringify({
                        id: response.userID,
                        user_type: response.user_type,
                        token: response.token,
                        date: response.today
                    });
                    await setCookie("user", cookie);
                     navigate("/")
                } else {
                    msgRef.current.classList.remove("success");
                    msgRef.current.classList.add("error");
                    showMessage(false, response.error);
                }
            } catch (error) {
                setLoading(false);
                msgRef.current.classList.remove("success");
                msgRef.current.classList.add("error");
                showMessage(false, error.message);
            }
        }
    };
    return (
        <div className="container">
            <div className="login">
                <h3>Create An Account</h3>
                <span ref={msgRef} id="message" className="error"></span>

                <input
                    id="username"
                    type="text"
                    placeholder="Enter User Full Name"
                    required="true"
                    onChange={e => {
                        setName(e.target.value);
                    }}
                />
                <input
                    id="email"
                    type="email"
                    placeholder="Enter Admin Email"
                    required="true"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Enter Your Password"
                    required="true"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={signup} className="login-btn">
                    <div
                        ref={loaderRef}
                        style={{ display: isLoading && "block" }}
                        className="loaderRef"
                    ></div>
                    Register Now
                </button>
                <p>
                    Already Have Account?
                    <NavLink to="/login">Login Now</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Signup;
