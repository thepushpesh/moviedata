import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
    >
      <Image
        src={movie.poster}
        alt={`${movie.title} poster`}
        width={600}
        height={900}
        className="h-72 w-full object-cover"
      />
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-900 group-hover:text-blue-600 dark:text-slate-100">
          {movie.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">{movie.year}</p>
      </div>
    </Link>
  );
}
