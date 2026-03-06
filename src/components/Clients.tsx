"use client"
import { useState, useMemo } from "react";
import styles from './clients.module.css';
import AddClient from "./AddClient";

type Client = {
  id: number
  name: string
  email: string
}

export default function Clients({ clients }: { clients: Client[] }) {
    const [modal, setModal] = useState(false)
    const [search, setSearch] = useState("");

    const filteredClients = useMemo(() => {
        const term = search.toLowerCase();

        return clients.filter(client =>
            client.name.toLowerCase().includes(term) ||
            client.email.toLowerCase().includes(term)
        );
    }, [search, clients]);

    return(
        <div className={styles.clients}>
            <header className={styles.header}>
                <h1>Clients</h1>

                <div>
                    <input
                        type='search'
                        placeholder='Search clients...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={() => setModal(true)}>Add Client +</button>
                </div>
            </header>

            <main className={styles.main}>
                {filteredClients.length === 0 ? (
                    <p className={styles.noClients}>No clients found.</p>
                ) : (
                    filteredClients.map((client) => (
                        <div key={client.id} className={styles.clientCard}>
                            <h2>{client.name}</h2>
                            <p>{client.email}</p>
                        </div>
                    ))
                )}
            </main>

            {modal && <AddClient onClose={() => setModal(false)}/>}
        </div>
    )
}