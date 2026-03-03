import { NextRequest, NextResponse } from "next/server"
import { getUserIdFromToken } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function GET() {
    try {
        const userId = await getUserIdFromToken();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const company = await sql`SELECT name FROM company WHERE id = ${userId}`;

        if (company.length === 0) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 })
        }

        return NextResponse.json(company[0])
    } catch (error) {
        console.error("Error fetching company data:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}