import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import './LoginPage.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowpass] = useState(true)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resetMessage, setResetMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setResetMessage("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess("Tizimga muvaffaqiyatli kirdingiz!");
            setEmail("");
            setPassword("");
        } catch (err) {
            setError("Login xatoligi: " + err.message);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setResetMessage("Iltimos, email kiriting.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setResetMessage("Parolni tiklash havolasi emailingizga yuborildi.");
        } catch (err) {
            setResetMessage("Xatolik yuz berdi: " + err.message);
        }
    };

    return (
        <div className="LoginPage">
            <h2>Tizimga kirish</h2>
            <div className="login__input">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group password-group">
                        <label htmlFor="password">Parol:</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span style={{ marginTop: "21px" }}
                                className="toggle-password"
                                onClick={() => setShowpass(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>
                    <button className="kirishbutton" type="submit">
                        Kirish
                    </button>
                    <div className="input__bottom">
                        <Link to="/register" className="register-link"><span>Ro‘yxatdan o‘tish</span></Link>
                        <button type="button" onClick={handleForgotPassword} className="forgot-password">
                            Parolni unutdingizmi?
                        </button>
                    </div>
                </form>
            </div>

            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {resetMessage && <p style={{ color: "blue" }}>{resetMessage}</p>}
        </div>
    );
};

export default Login;
