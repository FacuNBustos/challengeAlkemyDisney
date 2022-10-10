import { v4 } from "uuid";

export default class GenresMovie{
    private id: string;
    private genreID: string;
    private movieID: string;

    constructor(
        id: string,
        genreID: string,
        movieID: string
    ) {
        this.id = id;
        this.genreID = genreID;
        this.movieID = movieID;
    };

    public static create(genreID: string, movieID: string): GenresMovie {
        const id = v4();
        const genresMovie = new GenresMovie(id, genreID, movieID );

        return genresMovie;
    };

    static fromPrimitives(primitives: any) {
        const genresMovie = new GenresMovie(
            primitives.id,
            primitives.genreID,
            primitives.movieID
        );

        return genresMovie;
    };

    getId(): string {
        return this.id;
    };

    getGenreID(): string {
        return this.genreID;
    };

    getMovieID(): string {
        return this.movieID;
    };
}