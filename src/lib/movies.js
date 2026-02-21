import {
  getMovieById,
  movies,
  popularMovies,
  searchMovies,
  trendingMovies,
} from "./mock-data";
import {
  normalizeDetailsMovie,
  normalizeListMovie,
  normalizePagedMovies,
} from "./movie-normalizers";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const REVALIDATE = {
  home: 60 * 60,
  details: 60 * 60 * 6,
  search: 60 * 5,
};

const REQUEST_TIMEOUT_MS = 8000;

function hasTmdbKey() {
  return Boolean(process.env.TMDB_API_KEY);
}

function toSafePage(page) {
  const parsed = Number(page);
  if (Number.isNaN(parsed) || parsed < 1) {
    return 1;
  }
  return Math.floor(parsed);
}

async function tmdbFetch(path, options = {}) {
  const { params = {}, revalidate = REVALIDATE.home } = options;

  const query = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    language: "en-US",
    ...params,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}${path}?${query.toString()}`,
      {
        next: { revalidate },
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed: ${response.status} ${path}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

export async function getTrendingMovies() {
  if (!hasTmdbKey()) {
    return trendingMovies;
  }

  try {
    const data = await tmdbFetch("/trending/movie/week", {
      revalidate: REVALIDATE.home,
    });
    return (data.results || []).slice(0, 12).map(normalizeListMovie);
  } catch {
    return trendingMovies;
  }
}

export async function getPopularMovies() {
  if (!hasTmdbKey()) {
    return popularMovies;
  }

  try {
    const data = await tmdbFetch("/movie/popular", {
      params: { page: "1" },
      revalidate: REVALIDATE.home,
    });
    return (data.results || []).slice(0, 12).map(normalizeListMovie);
  } catch {
    return popularMovies;
  }
}

export async function getMovieDetails(id) {
  if (!hasTmdbKey()) {
    return getMovieById(id);
  }

  try {
    const [movie, credits, videos] = await Promise.all([
      tmdbFetch(`/movie/${id}`, { revalidate: REVALIDATE.details }),
      tmdbFetch(`/movie/${id}/credits`, { revalidate: REVALIDATE.details }),
      tmdbFetch(`/movie/${id}/videos`, { revalidate: REVALIDATE.details }),
    ]);

    return normalizeDetailsMovie(movie, credits, videos);
  } catch {
    return getMovieById(id);
  }
}

export async function searchMovieCatalog(query, page = 1) {
  if (!hasTmdbKey()) {
    return searchMovies(query, page);
  }

  const safePage = toSafePage(page);

  try {
    if (!query?.trim()) {
      const data = await tmdbFetch("/movie/popular", {
        params: { page: String(safePage) },
        revalidate: REVALIDATE.search,
      });

      return normalizePagedMovies(data, safePage);
    }

    const data = await tmdbFetch("/search/movie", {
      params: {
        query: query.trim(),
        page: String(safePage),
        include_adult: "false",
      },
      revalidate: REVALIDATE.search,
    });

    return normalizePagedMovies(data, safePage);
  } catch {
    return searchMovies(query, safePage);
  }
}

export async function getAllMovies() {
  if (!hasTmdbKey()) {
    return movies;
  }

  try {
    const [trending, popular] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
    ]);

    const map = new Map();
    [...trending, ...popular].forEach((movie) => {
      map.set(String(movie.id), movie);
    });

    return Array.from(map.values());
  } catch {
    return movies;
  }
}
