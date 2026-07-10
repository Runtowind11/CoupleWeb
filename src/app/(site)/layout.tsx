export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="h-16 border-b flex items-center px-6">
        <span className="font-semibold">Header Placeholder</span>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="h-16 border-t flex items-center justify-center px-6">
        <span className="text-sm text-muted-foreground">Footer Placeholder</span>
      </footer>
    </>
  );
}
