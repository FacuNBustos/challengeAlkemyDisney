import shap from "sharp";
import validate from "uuid-validate";
import { Undefinable } from '../../../domain/valueObjects/Undefinable';
import validateService from "../../../infraestructure/services/validate.service";

export default class UpdateCharacterCommand {
    private readonly id: string;
    private readonly name: string;
    private readonly age: number;
    private readonly weight: number;
    private readonly history: string;
    private readonly image: shap.Sharp;

    constructor(
        id: string,
        name: string,
        age: string,
        weight: string,
        history: string,
        image: Undefinable<Express.Multer.File>
    ) {
        if (!id || !validate(id)) {
            throw new Error("Invalid id");
        };

        if (!validateService.fullname(name) || name.length < 5) {
            throw new Error("Invalid name");
        };

        if (!validateService.number(age) || parseInt(age) <= 0) {
            throw new Error("Invalid age");
        };

        if (!validateService.number(weight) || parseInt(age) <= 0) {
            throw new Error("Invalid weight");
        };

        if (!history || history.length < 20) {
            throw new Error("Invalid history")
        };

        if (!image || image.mimetype !== "image/jpeg" && image.mimetype !== "image/png"){
            throw new Error("Image not allowed")
        };
        const processedImage = shap(image.buffer).resize(500, 500);

        this.id = id;
        this.name = name;
        this.age = Number(age);
        this.weight = Number(weight);
        this.history = history;
        this.image = processedImage;
    }

    getId(): string {
        return this.id;
    };

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