import { Undefinable } from "../../../domain/valueObjects/Undefinable";
import validateService from "../../../infraestructure/services/validate.service";

export default class FindByAgeCharacterCommand {
    private readonly age: number;

    constructor(
        age: any
    ) {
        if (typeof age !== 'string') throw new Error("invalid query params");
        
        if (!age || !validateService.number(age) || Number(age) <= 0) {
            throw new Error("invalid age");
        };
        this.age = Number(age);
    };

    getAge(): number {
        return this.age;
    }
}