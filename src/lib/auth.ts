import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"

interface CustomJwtPayload extends JwtPayload {
    id: string
}

export async function getUserIdFromToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value

    if (!token) return null

    const secret = process.env.JWT_SECRET

    if (!secret) {
        throw new Error("JWT_SECRET is not defined")
    }

    try {
        const decoded = jwt.verify(token, secret)

        if (
            typeof decoded === "object" &&
            decoded !== null &&
            "id" in decoded
        ) {
            return (decoded as CustomJwtPayload).id
        }

        return null
    } catch (error) {
        return null
    }
}