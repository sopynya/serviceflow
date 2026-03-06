"use client";
import { useEffect, useState } from "react";
import Clients from "@/components/Clients"
import Loading from "@/components/Loading";
export default function ClientsPage() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchClients() {
            try {
                setLoading(true)
                const res = await fetch('/api/dashboard');
                const data = await res.json();
                setClients(data.clients)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        }
        fetchClients();
    }, [])

    if(loading) return <Loading />
    return(
        <Clients clients={clients} />
    )
}