import { v4 } from "uuid";

export default class CharactersMovie{
    private id: string;
    private characterID: string;
    private movieID: string;

    constructor(
        id: string,
        characterID: string,
        movieID: string
    ) {
        this.id = id;
        this.characterID = characterID;
        this.movieID = movieID;
    };

    public static create(characterID: string, movieID: string): CharactersMovie {
        const id = v4();
        const charactersMovie = new CharactersMovie(id, characterID, movieID );

        return charactersMovie;
    };

    static fromPrimitives(primitives: any) {
        const charactersMovie = new CharactersMovie(
            primitives.id,
            primitives.characterID,
            primitives.movieID
        );

        return charactersMovie;
    };

    getId(): string {
        return this.id;
    };

    getCharacterID(): string {
        return this.characterID;
    };

    getMovieID(): string {
        return this.movieID;
    };
}