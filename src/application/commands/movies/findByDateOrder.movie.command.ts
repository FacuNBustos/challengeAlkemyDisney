
export default class FindByDateOrderMovieCommand {
    private readonly order: string;

    constructor(
        order: any
    ) {
        if (typeof order !== "string") throw new Error("Invalid query params");

        if (order.toUpperCase() !== 'ASC' && order.toUpperCase() !== "DESC") throw new Error("Invalid order");

        this.order = order.toUpperCase();
    };

    getOrder(): string {
        return this.order;
    };
}