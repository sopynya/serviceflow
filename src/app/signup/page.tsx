import { redirect } from "next/navigation"
import { getUserIdFromToken } from "@/lib/auth"
import Register from "@/components/Register";

export default async function LoginPage() {
    const userId = await getUserIdFromToken();

    if(userId) {
        redirect("/dashboard");
    }

    return <Register/>

}