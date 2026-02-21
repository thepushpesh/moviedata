const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function toSafeString(value, fallback = "") {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || fallback;
  }

  if (value === null || value === undefined) {
    return fallback;
  }

  return String(value);
}

function toSafeNumber(value, fallback = 0) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || !Number.isFinite(parsed)) {
    return fallback;
  }

  return parsed;
}

function toYear(releaseDate) {
  if (!releaseDate) {
    return "N/A";
  }

  const [year] = String(releaseDate).split("-");
  return year || "N/A";
}

function getPosterUrl(path, title) {
  const cleanPath = toSafeString(path);
  if (cleanPath) {
    return `${TMDB_IMAGE_BASE_URL}${cleanPath}`;
  }

  const encoded = encodeURIComponent(toSafeString(title, "Movie"));
  return `https://placehold.co/600x900/1f2937/f9fafb?text=${encoded}`;
}

function toRoundedRating(voteAverage) {
  const safe = toSafeNumber(voteAverage, 0);
  return Number(safe.toFixed(1));
}

export function normalizeListMovie(movie) {
  const title = toSafeString(movie?.title, "Untitled Movie");
  const releaseDate = toSafeString(movie?.release_date);

  return {
    id: toSafeString(movie?.id),
    title,
    year: toYear(releaseDate),
    releaseDate,
    rating: toRoundedRating(movie?.vote_average),
    overview: toSafeString(movie?.overview, "No overview available."),
    genres: [],
    poster: getPosterUrl(movie?.poster_path, title),
    trailerUrl: null,
    cast: [],
  };
}

export function normalizeDetailsMovie(movie, credits, videos) {
  const title = toSafeString(movie?.title, "Untitled Movie");
  const releaseDate = toSafeString(movie?.release_date);

  const topCast = Array.isArray(credits?.cast)
    ? credits.cast
        .map((actor) => toSafeString(actor?.name))
        .filter(Boolean)
        .slice(0, 6)
    : [];

  const trailerCandidates = Array.isArray(videos?.results)
    ? videos.results.filter(
        (video) =>
          video?.site === "YouTube" &&
          (video?.type === "Trailer" || video?.type === "Teaser") &&
          Boolean(video?.key)
      )
    : [];

  const trailer =
    trailerCandidates.find((video) => Boolean(video?.official)) ||
    trailerCandidates[0];

  const genres = Array.isArray(movie?.genres)
    ? movie.genres.map((genre) => toSafeString(genre?.name)).filter(Boolean)
    : [];

  return {
    id: toSafeString(movie?.id),
    title,
    year: toYear(releaseDate),
    releaseDate,
    rating: toRoundedRating(movie?.vote_average),
    overview: toSafeString(movie?.overview, "No overview available."),
    genres,
    poster: getPosterUrl(movie?.poster_path, title),
    trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : null,
    cast: topCast,
  };
}

export function normalizePagedMovies(data, page) {
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
  const totalPages = Math.max(1, Math.min(500, toSafeNumber(data?.total_pages, 1)));

  return {
    items: Array.isArray(data?.results) ? data.results.map(normalizeListMovie) : [],
    total: toSafeNumber(data?.total_results, 0),
    totalPages,
    page: safePage,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  };
}
