import { v4 } from "uuid";

export default class Character {
    private id: string;
    private name: string;
    private age: number;
    private weight: number;
    private history: string;
    private image: string;

    constructor(
        id: string,
        name: string,
        age: number,
        weight: number,
        history: string,
        image: string
    ) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.history = history;
        this.image = image;
    };

    public static create(name: string, age: number, weigth: number, history: string, image: string): Character {
        const id = v4();
        const character = new Character(id, name, age, weigth, history, image);

        return character;
    }

    static fromPrimitives(primitives: any) {
        const character = new Character(
            primitives.id,
            primitives.name,
            primitives.age,
            primitives.weight,
            primitives.history,
            primitives.image
        )

        return character;
    };

    getId(): string {
        return this.id;
    };

    getName(): string {
        return this.name;
    };

    getAge(): number {
        return this.age;
    };

    getWeight(): number {
        return this.weight;
    };

    getHistory(): string {
        return this.history;
    };

    getImage(): string {
        return this.image;
    };

    toPrimitives(): any {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            weight: this.weight,
            history: this.history,
            image: this.image
        };
    }
}