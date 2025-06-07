import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Register.css';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [showPassword, setShowpass] = useState(true)
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await addDoc(collection(db, "Users"), {
                uid: user.uid,
                email,
                firstName,
                lastName,
            });

            setSuccess("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="RegisterPage">
            <h2>Ro'yxatdan o'tish</h2>
            <form onSubmit={handleRegister} className="register__form">
                <div>
                    <label>Ism:</label><br />
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>Familiya:</label><br />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label><br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="password-wrapper">
                    <label>Parol:</label><br />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span style={{ marginTop: "22px" }} onClick={() => setShowpass(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>
            
                <button className="register__button" type="submit">Ro'yxatdan o'tish</button>
                <div className="register__bottom">
                    <Link to="/login"><span>Allaqachon akkauntingiz bormi? Kirish</span></Link>
                </div>
            </form>

            {success && <p style={{ color: "green" }}>{success}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Register;
