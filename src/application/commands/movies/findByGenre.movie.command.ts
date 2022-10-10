import validate from "uuid-validate";

export default class FindByGenreMovieCommand {
    private readonly genre: string;

    constructor(
        genre: any
    ) {
        if (typeof genre !== "string" || !validate(genre)) throw new Error("invalid genre query");

        this.genre = genre;
    };

    getGenre(): string {
        return this.genre;
    };
}