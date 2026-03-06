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
    const initials = name ? name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase() : '';
    return(
        <div className={styles.sidebar}>
            <div className={styles.brand}>
                <div className={styles.logo}>{initials || 'CP'}</div>
                <div>
                    <h2>{name || 'Company'}</h2>
                    <p className={styles.small}>Manage your workspace</p>
                </div>
            </div>
            <nav className={styles.nav}>
                <Link href='/dashboard' className={[pathname === '/dashboard' ? styles.activeLink : '', styles.navLink].join(' ')}><img src='/chart-bar.svg' />Dashboard</Link>
                <Link href='/orders' className={[pathname === '/orders' ? styles.activeLink : '', styles.navLink].join(' ')}><img src='/clipboard-text.svg'/>Service Orders</Link>
                <Link href='/clients' className={[pathname === '/clients' ? styles.activeLink : '', styles.navLink].join(' ')}><img src='/users.svg' />Clients</Link>
                <Link href='/technicians' className={[pathname === '/technicians' ? styles.activeLink : '', styles.navLink].join(' ')}><img src='/wrench.svg' />Technicians</Link>
            </nav>
        </div>
    )
}