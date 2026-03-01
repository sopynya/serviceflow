import { redirect } from "next/navigation"
import { getUserIdFromToken } from "@/lib/auth"
import Login from "@/components/Login"

export default async function LoginPage() {
    const userId = await getUserIdFromToken();

    if(userId) {
        redirect("/dashboard");
    }

    return <Login />

}