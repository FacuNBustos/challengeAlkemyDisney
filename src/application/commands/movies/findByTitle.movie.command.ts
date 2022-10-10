import validateService from "../../../infraestructure/services/validate.service";

export default class FindByTitleMovieCommand {
    private readonly title: string;

    constructor(
        title: any
    ) {
        if (typeof title !== "string" || !validateService.fullname(title)) throw new Error("invalid title");

        this.title = title;
    };

    getTitle(): string {
        return this.title;
    };

}