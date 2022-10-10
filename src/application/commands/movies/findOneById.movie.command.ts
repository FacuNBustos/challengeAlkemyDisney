import validate from "uuid-validate";

export default class FindOneByIdMovieCommand {
    private readonly movieID: string;

    constructor(
        movieID: string
    ) {
        if (!validate(movieID)) {
            throw new Error("invalida movie id");
        };

        this.movieID = movieID;
    };

    getMovieID(): string {
        return this.movieID;
    };
}