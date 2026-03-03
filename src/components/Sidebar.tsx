"use client";
import { useState, useEffect } from 'react';
import styles from './sidebar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function Sidebar() {
    const pathname = usePathname();
    const [name, setName] = useState("");

    useEffect(() => {
        fetch("/api/company").then(res => res.json()).then(data => {
            setName(data.name);
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    return(
        <div className={styles.sidebar}>
            <h2>{name}</h2>
            <Link href='/dashboard' className={pathname === '/dashboard' ? styles.activeLink : ''}><img src='/chart-bar.svg' />Dashboard</Link>
            <Link href='/orders' className={pathname === '/orders' ? styles.activeLink : ''}><img src='/clipboard-text.svg'/>Service Orders</Link>
            <Link href='/clients' className={pathname === '/clients' ? styles.activeLink : ''}><img src='/users.svg' />Clients</Link>
            <Link href='/technicians' className={pathname === '/technicians' ? styles.activeLink : ''}><img src='/wrench.svg' />Technicians</Link>
        </div>
    )
}