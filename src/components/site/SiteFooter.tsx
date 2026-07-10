export default function SiteFooter() {
  return (
    <footer className="border-t py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted-foreground">
          Made with <span className="text-rose-500">&hearts;</span> by Us
          &middot; &copy; {new Date().getFullYear()} Our Story
        </p>
      </div>
    </footer>
  );
}
