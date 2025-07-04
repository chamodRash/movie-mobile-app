export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchMovies = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=true&language=en-US&page=${page}&sort_by=popularity.desc`
    : `/discover/movie?include_adult=true&language=en-US&page=${page}&sort_by=popularity.desc`;

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
