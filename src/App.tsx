import { ThemeToggle } from "./components/ui/theme-toggle";
import Navbar from "./components/ui/navbar";
import MovieCard from "./components/ui/movieCard";
import { movies, type Movie } from "./data/movies";
import MovieDetails from "./components/ui/movieDetails";

const GENRE_PARAM = "genre";
const MOVIE_PARAM = "movie";

function getGenreFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(GENRE_PARAM);
    return value && value.trim().length > 0 ? value : null;
}

function setGenreInUrl(genre: string | null) {
    const url = new URL(window.location.href);
    if (!genre) url.searchParams.delete(GENRE_PARAM);
    else url.searchParams.set(GENRE_PARAM, genre);
    window.location.assign(url.toString());
}

function getMovieFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(MOVIE_PARAM);
    return value && value.trim().length > 0 ? value : null;
}

function setMovieInUrl(title: string | null) {
    const url = new URL(window.location.href);
    if (!title) url.searchParams.delete(MOVIE_PARAM);
    else url.searchParams.set(MOVIE_PARAM, title);
    window.location.assign(url.toString());
}

function uniqueGenres(all: Movie[]): string[] {
    return Array.from(new Set(all.map((m) => m.genre))).sort((a, b) =>
        a.localeCompare(b),
    );
}

export default function App() {
    const calculateTime = (showtime: number): string => {
        if (showtime < 12) return "Morning Show";
        if (showtime >= 12 && showtime < 18) return "Afternoon Show";
        return "Evening Show";
    };

    const genre = getGenreFromUrl();
    const genres = uniqueGenres(movies);

    const filteredMovies =
        genre === null ? movies : movies.filter((m) => m.genre === genre);

    const selectedTitle = getMovieFromUrl();
    const selectedMovie =
        selectedTitle === null
            ? null
            : (movies.find((m) => m.title === selectedTitle) ?? null);

    if (selectedMovie) {
        return (
            <>
                <h1 className="p-4 text-3xl font-bold">
                    Troy's Epic Movie Collection
                </h1>
                <Navbar children={<ThemeToggle />} />
                <MovieDetails
                    movie={selectedMovie}
                    onBack={() => setMovieInUrl(null)}
                />
            </>
        );
    }

    return (
        <>
            <h1 className="p-4 text-3xl font-bold">
                Troy's Epic Movie Collection
            </h1>
            <Navbar children={<ThemeToggle />} />

            <div className="min-h-screen w-full px-6 py-10">
                <div className="flex flex-wrap items-center gap-3">
                    <label
                        htmlFor="genre"
                        className="text-sm font-medium opacity-80"
                    >
                        Genre
                    </label>
                    <select
                        id="genre"
                        className="h-10 rounded-md border px-3"
                        value={genre ?? ""}
                        onChange={(e) => setGenreInUrl(e.target.value || null)}
                    >
                        <option value="">All</option>
                        {genres.map((g) => (
                            <option key={g} value={g}>
                                {g}
                            </option>
                        ))}
                    </select>

                    {genre !== null && (
                        <button
                            className="h-10 rounded-md border px-3 text-sm"
                            onClick={() => setGenreInUrl(null)}
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className="mt-10 grid gap-6 justify-center justify-items-center [grid-template-columns:repeat(auto-fit,minmax(280px,320px))]">
                    {filteredMovies.map((movie: Movie) => {
                        const handleViewMovie = () =>
                            setMovieInUrl(movie.title);

                        return (
                            <MovieCard
                                key={movie.title}
                                {...movie}
                                showtime={calculateTime(movie.showtime)}
                                onClick={handleViewMovie}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
