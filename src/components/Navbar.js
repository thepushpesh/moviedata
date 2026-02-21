import Link from "next/link";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ initialQuery = "" }) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100"
        >
          MovieVault
        </Link>
        <div className="w-full md:flex-1 md:px-4">
          <SearchBar initialQuery={initialQuery} />
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
