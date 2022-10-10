import shap from "sharp";
import { Undefinable } from '../../../domain/valueObjects/Undefinable';
import validateService from "../../../infraestructure/services/validate.service";

export default class CreateCharacterCommand {
    private readonly name: string;
    private readonly age: number;
    private readonly weight: number;
    private readonly history: string;
    private readonly image: shap.Sharp;

    constructor(
        name: string,
        age: string,
        weight: string,
        history: string,
        image: Undefinable<Express.Multer.File>
    ) {
        if (!validateService.fullname(name) || name.length < 5) {
            throw new Error("Invalid name");
        };

        if (!validateService.number(age) || Number(age) <= 0) {
            throw new Error("Invalid age");
        };

        if (!validateService.number(weight) || Number(weight) <= 0) {
            throw new Error("Invalid weight");
        };

        if (!history || history.length < 20) {
            throw new Error("Invalid history")
        };

        if (!image || image.mimetype !== "image/jpeg" && image.mimetype !== "image/png"){
            throw new Error("Image not allowed")
        };
        const processedImage = shap(image.buffer).resize(500, 500);

        this.name = name;
        this.age = Number(age);
        this.weight = Number(weight);
        this.history = history;
        this.image = processedImage;
    }

    getName(): string {
        return this.name;
    };

    getAge(): number {
        return this.age;
    };

    getWeight(): number {
        return this.weight;
    };

    getHistory(): string {
        return this.history;
    };

    getImage(): shap.Sharp {
        return this.image;
    };
}