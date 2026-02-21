"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialQuery = "", className = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const normalized = query.trim();
    if (!normalized) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(normalized)}`);
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`.trim()}>
      <div className="flex w-full gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by movie title or genre"
          className="h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none ring-blue-200 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="h-11 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
