import validate from "uuid-validate";

export default class FindByGenreMovieCommand {
    private readonly genre: string;

    constructor(
        genre: any
    ) {
        if (typeof genre !== "string") throw new Error("Invalid query params");

        if (!validate(genre)) throw new Error("Invalid genre id");

        this.genre = genre;
    };

    getGenre(): string {
        return this.genre;
    };
}