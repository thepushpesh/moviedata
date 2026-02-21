import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getMovieDetails } from "@/lib/movies";

export const revalidate = 21600;

function formatReleaseDate(dateString) {
  if (!dateString) {
    return "Unknown";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return { title: "Movie Not Found" };
  }

  return {
    title: `MovieVault | ${movie.title}`,
  };
}

export default async function MovieDetailsPage({ params }) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <main className="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 px-4 py-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Movie not found</h1>
          <p className="text-slate-600 dark:text-slate-400">
            We could not find the movie you requested.
          </p>
          <Link
            href="/"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Back to Home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <Image
            src={movie.poster}
            alt={`${movie.title} poster`}
            width={600}
            height={900}
            className="h-auto w-full rounded-xl border border-slate-200 object-cover shadow-sm dark:border-slate-700"
            priority
          />

          <section className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
                {movie.title}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Release date: {formatReleaseDate(movie.releaseDate)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Rating: {movie.rating ? `${movie.rating}/10` : "Not rated"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Overview</h2>
              <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{movie.overview}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Genres</h2>
              {movie.genres.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-full border border-slate-300 bg-white px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Genres unavailable.</p>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Top Cast</h2>
              {movie.cast.length > 0 ? (
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {movie.cast.slice(0, 6).map((actor) => (
                    <div
                      key={actor}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {actor}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Cast details unavailable.</p>
              )}
            </div>
          </section>
        </div>

        <section className="mt-10">
          <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Trailer</h2>
          {movie.trailerUrl ? (
            <div className="aspect-video overflow-hidden rounded-xl border border-slate-200 bg-black shadow-sm dark:border-slate-700">
              <iframe
                className="h-full w-full"
                src={movie.trailerUrl}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Trailer is not available for this movie.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
