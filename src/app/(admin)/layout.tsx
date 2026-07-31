import Sidebar from "@/components/admin/Sidebar";
import SessionGuard from "@/components/admin/SessionGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionGuard>
      <div className="flex min-h-screen md:h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 pt-16 md:p-8 md:pt-8">{children}</main>
      </div>
    </SessionGuard>
  );
}
