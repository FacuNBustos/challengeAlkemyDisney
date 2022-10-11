import validateService from "../../../infraestructure/services/validate.service";

export default class FindByNameCharacterCommand {
    private readonly name: string;

    constructor(
        name: any
    ) {
        if (typeof name !== 'string') throw new Error("Invalid query params");

        if (!validateService.fullname(name)) {
            throw new Error("Invalid name");
        };
        this.name = name;
    };

    getName(): string {
        return this.name;
    }
}