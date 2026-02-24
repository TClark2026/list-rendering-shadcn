import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "./card";

interface MovieProps {
    title: string;
    description: string;
    genre: string;
    showtime: string;
    poster: string;
}

const movieCard = ({
    title,
    description,
    genre,
    showtime,
    poster,
}: MovieProps) => {
    return (
        <Card className="w-full min-w-0 overflow-hidden flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle className="line-clamp-1">{title}</CardTitle>
                <CardDescription className="line-clamp-1">
                    {genre}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 min-h-0 flex flex-col gap-3">
                <div className="w-full aspect-[3/4] rounded-md bg-secondary flex items-center justify-center overflow-hidden">
                    <img
                        src={poster}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                <p className="text-sm line-clamp-3">{description}</p>
            </CardContent>

            <CardFooter className="flex-none">
                <p className="line-clamp-1">{showtime}</p>
            </CardFooter>
        </Card>
    );
};

export default movieCard;
