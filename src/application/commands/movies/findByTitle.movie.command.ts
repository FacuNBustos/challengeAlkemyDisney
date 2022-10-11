import validateService from "../../../infraestructure/services/validate.service";

export default class FindByTitleMovieCommand {
    private readonly title: string;

    constructor(
        title: any
    ) {
        if (typeof title !== "string") throw new Error("Invalid query params");

        if (!validateService.fullname(title)) throw new Error("Invalid title");

        this.title = title;
    };

    getTitle(): string {
        return this.title;
    };

}