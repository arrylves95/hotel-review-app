import React, { useState } from "react";
import { auth } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [username, setU] = useState("");
    const [password, setP] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        const user = auth.login(username, password);
        if (!user) return alert("Invalid username or password");
        navigate("/");
    }

    return (
        <div className="card">
            <h2>Login</h2>
            <form className="form" onSubmit={handleLogin}>
                <label>Username <input value={username} onChange={e => setU(e.target.value)} /></label>
                <label>Password <input type="password" value={password} onChange={e => setP(e.target.value)} /></label>
                <div className="actions"><button type="submit">Login</button></div>
            </form>
            <p>New user? <Link to="/register">Register</Link></p>
        </div>
    );
}
