import { validate } from "uuid";

export default class CreateSessionCommand {
    private readonly userID: string;

    constructor(
        userID: string
    ) {
        if(!validate(userID)){
            throw new Error("Id is not validate");
        };

        this.userID = userID;
    };

    getUserID() {
        return this.userID
    };
}