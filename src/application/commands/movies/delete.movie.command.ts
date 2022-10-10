import validate from "uuid-validate";

export default class DeleteMovieCommand {
    private readonly movieID: string;

    constructor(
        movieID: string
    ) {
        if (!validate(movieID)) {
            throw new Error("invalid movie id");
        };

        this.movieID = movieID;
    };

    getMovieID(): string {
        return this.movieID;
    }
}