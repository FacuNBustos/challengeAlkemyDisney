import validateService from "../../../infraestructure/services/validate.service";

export default class LoginUserCommand {
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

        this.email = email;
        this.password = password;
    };

    getEmail(): string {
        return this.email;
    };

    getPassword(): string {
        return this.password;
    };
}