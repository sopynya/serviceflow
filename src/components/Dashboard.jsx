"use client"
import { useEffect, useState } from "react"
import styles from './dashboard.module.css'
import Link from "next/link";
export default function Dashboard({services, clients}) {
    const [time, setTime] = useState("today");
    const [changeTime, setChangeTime] = useState(false);
    const [filteredServices, setFilteredServices] = useState(services);
    const [filteredClients, setFilteredClients] = useState(clients);

    useEffect(() => {
    const now = new Date();
    let startDate;

    if (time === "today") {
        startDate = new Date();
        startDate.setHours(0,0,0,0);
    }

    if (time === "week") {
        startDate = new Date();
        const day = startDate.getDay();
        startDate.setDate(startDate.getDate() - day);
        startDate.setHours(0,0,0,0);
    }

    if (time === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    if (time === "year") {
        startDate = new Date(now.getFullYear(), 0, 1);
    }

    if (time === "all") {
        setFilteredServices(services);
        setFilteredClients(clients);
        return;
    }

    const filteredS = services.filter(service => {
        const date = new Date(service.created_at);
        return date >= startDate;
    });

    const filteredC = clients.filter(client => {
        const date = new Date(client.created_at);
        return date >= startDate;
    });

    setFilteredServices(filteredS);
    setFilteredClients(filteredC);

}, [time, services, clients]);
    return(
        <div className={styles.dashboard}>
            <header className={styles.headerRow}>
                <div>
                    <h1>Dashboard</h1>
                    <p className={styles.subtitle}>Overview of recent activity and key metrics</p>
                </div>

                <div style={{ position: "relative" }}>
                    <button className={styles.changeTime} onClick={() => setChangeTime(!changeTime)}>{time}<img src="caret-down.svg"/></button>
                    {changeTime && 
                    <div className={styles.timeOptions}>
                        <button onClick={() => setTime("today")}>Today</button>
                        <hr />
                        <button onClick={() => setTime("week")}>Week</button>
                        <hr />
                        <button onClick={() => setTime("month")}>Month</button>
                        <hr />
                        <button onClick={() => setTime("year")}>Year</button>
                        <hr />
                        <button onClick={() => setTime("all")}>All</button>
                    </div>
                    }
                </div>
            </header>

            <main>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.cardLeft}>
                            <img src='check-circle.svg' />
                            <div>
                                <h3>Completed</h3>
                                <p className={styles.cardNumber}>{filteredServices.filter(s => s.status === 'completed').length}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardLeft}>
                            <img src='clock.svg' />
                            <div>
                                <h3>Pending</h3>
                                <p className={styles.cardNumber}>{filteredServices.filter(s => s.status === 'pending').length}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardLeft}>
                            <img src='users.svg' />
                            <div>
                                <h3>New Clients</h3>
                                <p className={styles.cardNumber}>{filteredClients.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.recent}>
                    <div className={styles.recentHeader}> 
                        <h2>Recent Service Orders</h2>
                        <Link href='/clients'>View All <img src='caret-right.svg' /></Link>
                    </div>

                    <table className={styles.recentTable}>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Service</th>
                                <th>Technician</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredServices.slice(0, 5).map(service => (
                                <tr key={service.id}>
                                    <td>{service.client}</td>
                                    <td>{service.service}</td>
                                    <td>{service.technician}</td>
                                    <td><span className={service.status === 'completed' ? styles.statusCompleted : styles.statusPending}>{service.status.charAt(0).toUpperCase() + service.status.slice(1)}</span></td>
                                    <td><span className={service.priority === 'high' ? styles.priorityHigh : service.priority === 'medium' ? styles.priorityMedium : styles.priorityLow}>{service.priority.charAt(0).toUpperCase() + service.priority.slice(1)}</span></td>
                                    <td>{new Date(service.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}