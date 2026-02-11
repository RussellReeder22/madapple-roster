import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 font-bold text-white text-sm">
            MA
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">
              Mad Apple Softball
            </h1>
            <p className="text-xs text-muted-foreground">
              2025–2026 Roster
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}
