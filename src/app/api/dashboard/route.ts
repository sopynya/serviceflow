import { NextRequest, NextResponse } from "next/server"
import { getUserIdFromToken } from "@/lib/auth"
import { sql } from "@/lib/db" 

export async function GET() {
    try {
        const userId = await getUserIdFromToken();
        
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const services = await sql`SELECT * FROM services WHERE company_id = ${userId}`;
        const clients = await sql`SELECT * FROM clients WHERE company_id = ${userId}`;

        return NextResponse.json({ services: services, clients: clients })
        
    } catch (error) {
        console.error("Error fetching dashboard data:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}