"use client";
import { useState } from "react";
import styles from "./auth.module.css"
import Link from "next/link"
export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.SubmitEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = "/dashboard";
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return(
        <div className={styles.page}>
            <img src='/login.svg'/>
            <div className={styles.container}>
                <h1>Welcome back</h1>
                <p>Please enter your details</p>
                <form onSubmit={handleLogin}>
                    <label>Email address</label>
                    <input type='email' onChange={e => setEmail(e.target.value)} required />
                    <label>Password</label>
                    <input type='password' onChange={e => setPassword(e.target.value)} required />
                    <button type='submit'>{loading ? "Signing in..." : "Sign in"}</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.link}>Don't have an account? <Link href="/signup">Sign up</Link></p>
            </div>
        </div>
    )
}