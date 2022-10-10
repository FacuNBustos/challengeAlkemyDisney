import { v4 } from "uuid";

export default class Session {
    private token: string;
    private userID: string;

    constructor(
        token: string,
        userID: string
    ) {
        this.token = token;
        this.userID = userID
    };

    public static create(userID: string): Session {
        const token = v4();
        const session = new Session(token, userID);

        return session;
    };

    static fromPrimitives(primitives: any): Session {
        const session = new Session(
            primitives.token,
            primitives.userID
        );

        return session;
    }

    getToken(): string {
        return this.token;
    };

    getUserID(): string {
        return this.userID;
    };
}