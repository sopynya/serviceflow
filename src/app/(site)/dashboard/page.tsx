"use client";
import Dashboard from '@/components/Dashboard'
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

export default function DashboardPage() {
    const [services, setServices] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch('/api/dashboard');
                const data = await response.json();
                setServices(data.services);
                setClients(data.clients);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        }
        fetchData();

    }, []);

    if(loading) return <Loading />
    return(
        <Dashboard services={services} clients={clients} />
    )
}