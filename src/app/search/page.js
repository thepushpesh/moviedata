import Link from "next/link";
import MovieGrid from "@/components/MovieGrid";
import Navbar from "@/components/Navbar";
import { searchMovieCatalog } from "@/lib/movies";

function buildSearchHref(query, page) {
  const params = new URLSearchParams();
  if (query) {
    params.set("q", query);
  }
  params.set("page", String(page));
  return `/search?${params.toString()}`;
}

export const revalidate = 300;

export const metadata = {
  title: "MovieVault | Search",
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;

  const result = await searchMovieCatalog(query, page);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar initialQuery={query} />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Search Results
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {query
              ? `${result.total} results for "${query}"`
              : `Showing all ${result.total} movies`}
          </p>
        </div>

        {result.total === 0 && query ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              No results found for &ldquo;{query}&rdquo;.
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Try another movie title, genre, or browse popular movies.
            </p>
            <Link
              href="/search"
              className="mt-5 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
            >
              Browse Popular Movies
            </Link>
          </div>
        ) : (
          <MovieGrid movies={result.items} />
        )}

        {result.total > 0 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href={buildSearchHref(query, Math.max(1, result.page - 1))}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                result.hasPrevPage
                  ? "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
                  : "pointer-events-none bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500"
              }`}
            >
              Previous
            </Link>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              Page {result.page} of {result.totalPages}
            </span>
            <Link
              href={buildSearchHref(query, result.page + 1)}
              className={`rounded-md px-4 py-2 text-sm font-semibold ${
                result.hasNextPage
                  ? "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
                  : "pointer-events-none bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500"
              }`}
            >
              Next
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
