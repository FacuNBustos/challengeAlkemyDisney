import validate from "uuid-validate";

export default class FindByMovieCharacterCommand {
    private readonly movieID: string;

    constructor(
        movieID: any
    ) {
        if (typeof movieID !== 'string') throw new Error("invalid query params");

        if (!validate(movieID)) {
            throw new Error("invalid movie id");
        };
        this.movieID = movieID;
    };

    getMovie(): string {
        return this.movieID;
    }
}