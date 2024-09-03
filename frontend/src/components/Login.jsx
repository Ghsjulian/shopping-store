import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import { setCookie, getCookie, isAdmin } from "../Cookies";

const Login = () => {
    const cookie = getCookie("user");
    const navigate = useNavigate();
    document.title = "Login To Your Account | Shopping Cart E Commerce";
    const host = import.meta.env.VITE_API_URL;
    const msgRef = useRef(null);
    const loaderRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
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

    const login = async e => {
        e.preventDefault();
        if (!email.trim() && !password.trim()) {
            msgRef.current.classList.remove("success");
            msgRef.current.classList.add("error");
            showMessage(false, "Please Enter Login Credential!");
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
                    email,
                    password
                };
                const sendData = await fetch(host + "/login", {
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
                    /* If the user is admin then
                    redirect to admin dashboard*/
                    const cookie = {
                        id: response.userID,
                        user_type: response.user_type,
                        token: response.token,
                        date: response.today
                    };
                    await setCookie("user", JSON.stringify(cookie));
                    if (response.user_type === "Admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
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
                <h3>Please Login !</h3>
                <span ref={msgRef} id="message" className="error"></span>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter User Email"
                    required="true"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                />
                <input
                    id="password"
                    type="password"
                    placeholder="Enter User Password"
                    required="true"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                />
                <button onClick={login} className="login-btn">
                    <div
                        ref={loaderRef}
                        style={{ display: isLoading && "block" }}
                        className="loaderRef"
                    ></div>
                    Login Now
                </button>
                <p>
                    Don't Have Account?
                    <NavLink to="/signup">Signup Now</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
