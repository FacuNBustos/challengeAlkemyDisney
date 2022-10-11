import hashService from "../../../infraestructure/services/hash.service";
import validateService from "../../../infraestructure/services/validate.service";

export default class CreateUserCommand {
    private readonly email: string;
    private readonly password: string;

    constructor(
        email: string,
        password: string
    ) {
        if (!validateService.email(email)) {
            throw new Error("Invalid email");
        };

        if (!password || password.length < 5) {
            throw new Error("Invalid password");
        };
        
        const hashedPassword = hashService.HashGet(password);
        if (!hashService.HashCompare(password, hashedPassword)) {
            throw new Error("An error occurred while hashing");
        };

        this.email = email;
        this.password = hashedPassword;
    }

    getEmail(): string {
        return this.email;
    };

    getPassword(): string {
        return this.password;
    };
}