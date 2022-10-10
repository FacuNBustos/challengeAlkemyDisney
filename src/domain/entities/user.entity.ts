import { v4 } from "uuid";

export default class User {
    private id: string;
    private email: string;
    private password: string;

    constructor(
        id: string,
        email: string,
        password: string
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
    };

    public static create(email: string, password: string): User {
        const id = v4();
        const user = new User(id, email, password);

        return user;
    };

    static fromPrimitives(primitives: any) {
        const user = new User(
            primitives.id,
            primitives.email,
            primitives.password
        );

        return user;
    }

    getId(): string {
        return this.id;
    };

    getEmail(): string {
        return this.email;
    };

    getPassword(): string {
        return this.password;
    };
}