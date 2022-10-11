import validate from "uuid-validate";

export default class FindByMovieCharacterCommand {
    private readonly movieID: string;

    constructor(
        movieID: any
    ) {
        if (typeof movieID !== 'string') throw new Error("nvalid query params");

        if (!validate(movieID)) {
            throw new Error("Invalid movie id");
        };
        this.movieID = movieID;
    };

    getMovie(): string {
        return this.movieID;
    }
}