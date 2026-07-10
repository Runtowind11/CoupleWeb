import Sidebar from "@/components/admin/Sidebar";
import SessionGuard from "@/components/admin/SessionGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionGuard>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-zinc-50 p-8">{children}</main>
      </div>
    </SessionGuard>
  );
}
