import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sql } from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const { email, password, name } = await req.json();

        const existingUser = await sql`
            SELECT id FROM company WHERE email = ${email}
        `;

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await sql`INSERT INTO company (email, password, name) VALUES (${email}, ${hashedPassword}, ${name}) RETURNING id`;
        const userId = newUser[0].id;

        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        const res = NextResponse.json({ success: true });

        res.cookies.set("token", token, { httpOnly: true, secure: true, sameSite: "strict", path: "/" });

        return res;
    } catch (error) {
        console.error("Registration error:", error);
        NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}