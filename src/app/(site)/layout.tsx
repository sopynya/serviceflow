import Sidebar from "@/components/Sidebar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            {children}
        </div>
    )
}