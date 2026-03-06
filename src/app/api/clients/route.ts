import { NextRequest, NextResponse } from "next/server"
import { getUserIdFromToken } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const userId = await getUserIdFromToken();
        const {name, email} = await req.json();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        
        const data = await sql`INSERT INTO clients (company_id, name, email) VALUES (${userId}, ${name}, ${email}) RETURNING *`
        
        return NextResponse.json(data[0])
    } catch (error) {
        console.error("Error fetching company data:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}