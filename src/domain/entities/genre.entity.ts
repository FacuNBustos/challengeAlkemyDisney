import { v4 } from "uuid";

export default class Genre{
    private id: string;
    private name: string;
    private image: string;

    constructor(
        id: string,
        name: string,
        image: string
    ) {
        this.id = id;
        this.name = name;
        this.image = image;
    };

    public static create(name: string, image: string): Genre {
        const id = v4();
        const genre = new Genre(id, name, image);

        return genre;
    }

    static fromPrimitives(primitives: any) {
        const genre = new Genre(
            primitives.id,
            primitives.name,
            primitives.image
        );

        return genre;
    }

    getId(): string {
        return this.id;
    };

    getName(): string {
        return this.name;
    };

    getImage(): string {
        return this.image;
    };
}