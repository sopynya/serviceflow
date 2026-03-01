import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { sql } from "@/lib/db"

interface LoginBody {
    email: string,
    password: string,
}
export async function POST(req: NextRequest) {
    try {
        const body: LoginBody = await req.json();
        const { email, password } = body;

        const user = await sql`
            SELECT * FROM company WHERE email = ${email}
        `;

        if (user.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const dbUser = user[0];

        const passwordMatch = await bcrypt.compare(password, dbUser.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const token = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        const res = NextResponse.json({ success: true });

        res.cookies.set("token", token, { httpOnly: true, secure: true, sameSite: "strict", path: "/" });

        return res;
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}