import { auth } from "@/auth";

export default async function DashboardPage() {
    const session = await auth();
    console.log("Session:", session);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}