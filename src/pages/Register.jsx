import React, { useState } from "react";
import { auth } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
{/* AHRA-10: Registration form UI implemented */ }

export default function Register() {
    const [username, setU] = useState("");
    const [password, setP] = useState("");
    const navigate = useNavigate();

    function handleRegister(e) {
        e.preventDefault();
        const result = auth.register(username, password);
        if (result.error) {
            alert(result.error);
            return;
        }
        alert("Account created! Please login.");
        navigate("/login");
    }

    return (
        <div className="card">
            <h2>Create Account</h2>
            <form className="form" onSubmit={handleRegister}>
                <label>Username <input value={username} onChange={e => setU(e.target.value)} /></label>
                <label>Password <input type="password" value={password} onChange={e => setP(e.target.value)} /></label>
                <div className="actions"><button type="submit">Register</button></div>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}
