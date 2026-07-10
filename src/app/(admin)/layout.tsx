export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r flex flex-col p-4">
        <span className="font-semibold mb-6">Admin Sidebar Placeholder</span>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
