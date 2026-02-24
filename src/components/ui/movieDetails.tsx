import type { Movie } from "@/data/movies";

function MovieDetails({ movie, onBack }: { movie: Movie; onBack: () => void }) {
    const calculateTime = (showtime: number): string => {
        if (showtime < 12) return "Morning Show";
        if (showtime >= 12 && showtime < 18) return "Afternoon Show";
        return "Evening Show";
    };

    return (
        <div className="min-h-screen w-full px-6 py-10">
            <div className="mb-6 flex items-center gap-3">
                <button
                    className="h-10 rounded-md border px-3 text-sm"
                    onClick={onBack}
                >
                    Back
                </button>
                <h2 className="text-2xl font-bold">{movie.title}</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-[320px_1fr] items-start">
                <div className="w-full aspect-[3/4] rounded-md bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                        src={movie.poster}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium opacity-80">Genre</p>
                        <p className="text-base">{movie.genre}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium opacity-80">
                            Showtime
                        </p>
                        <p className="text-base">
                            {calculateTime(movie.showtime)}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium opacity-80">
                            Description
                        </p>
                        <p className="text-base leading-relaxed">
                            {movie.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetails;
