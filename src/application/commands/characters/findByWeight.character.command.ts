import validateService from "../../../infraestructure/services/validate.service";

export default class FindByWeightCharacterCommand {
    private readonly weight: number;

    constructor(
        weight: any
    ) {
        if (typeof weight !== 'string') throw new Error("Invalid query params");
        
        if (!weight || !validateService.number(weight) || Number(weight) <= 0) {
            throw new Error("Invalid weight");
        };
        this.weight = Number(weight)
    };

    getWeight(): number {
        return this.weight;
    };
}