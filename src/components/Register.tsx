"use client";
import { useState } from "react";
import styles from "./auth.module.css"
import Link from "next/link"

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    async function handleRegister(e: React.SubmitEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = "/dashboard";
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return(
        <div className={styles.page}>
            <img src='/register.svg' />
            <div className={styles.container}>
                <h1>Create an account</h1>
                <p>Please enter your company details</p>

                <form onSubmit={handleRegister}>
                    <label>Company name</label>
                    <input type='text' onChange={e => setName(e.target.value)} required />
                    <label>Email address</label>
                    <input type='email' onChange={e => setEmail(e.target.value)} required />
                    <label>Password</label>
                    <input type='password' onChange={e => setPassword(e.target.value)} required />
                    <button type='submit'>{loading ? "Creating account..." : "Create account"}</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.link}>Already have an account? <Link href="/login">Login</Link></p>
            </div>
            
        </div>
    )
}