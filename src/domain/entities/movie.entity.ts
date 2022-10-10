import { v4 } from "uuid";

export default class Movie {
    private id: string;
    private title: string;
    private creationDate: Date;
    private score: number;
    private image: string;

    constructor(
        id: string,
        title: string,
        creationDate: Date,
        score: number,
        image: string,
    ) {
        this.id = id;
        this.title = title;
        this.creationDate = creationDate;
        this.score = score;
        this.image = image;
    };

    public static create(title: string, creationDate: Date, score: number, image: string): Movie {
        const id = v4();
        const movie = new Movie(id, title, creationDate, score, image);

        return movie;
    };

    static fromPrimitives(primitives: any): Movie {
        const movie = new Movie(
            primitives.id,
            primitives.title,
            primitives.creationDate,
            primitives.score,
            primitives.image
        );

        return movie;
    }

    getId(): string {
        return this.id;
    };

    getTitle(): string {
        return this.title;
    };

    getCreationDate(): Date {
        return this.creationDate;
    };

    getScore(): number {
        return this.score;
    };

    getImage(): string {
        return this.image;
    };

    toPrimitives(): any {
        return {
            id: this.id,
            title: this.title,
            creationDate: this.creationDate,
            score: this.score,
            image: this.image
        }
    }
}