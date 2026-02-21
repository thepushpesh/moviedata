import MovieGrid from "@/components/MovieGrid";
import Navbar from "@/components/Navbar";
import { getPopularMovies, getTrendingMovies } from "@/lib/movies";

export const revalidate = 3600;

export const metadata = {
  title: "MovieVault | Home",
};

export default async function HomePage() {
  const [trendingMovies, popularMovies] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8">
        <section className="rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-10 text-white">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Discover your next favorite movie
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-blue-50 md:text-base">
            Explore trending picks, popular releases, and quickly jump to movie
            details with full cast and trailers.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Trending Movies
            </h2>
          </div>
          <MovieGrid movies={trendingMovies} />
        </section>

        <section className="space-y-4 pb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Popular Movies
            </h2>
          </div>
          <MovieGrid movies={popularMovies} />
        </section>
      </main>
    </div>
  );
}
