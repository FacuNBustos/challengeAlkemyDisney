import shap from 'sharp';
import { Undefinable } from '../../../domain/valueObjects/Undefinable';
import validateService from '../../../infraestructure/services/validate.service';

export default class CreateGenreCommand {
    private readonly name: string;
    private readonly image: shap.Sharp;

    constructor(
        name: string,
        image: Undefinable<Express.Multer.File>
    ) {
        
        if (!validateService.fullname(name) || name.length < 5) {
            throw new Error("Invalid name")
        };

        if (!image || image.mimetype !== "image/jpeg" && image.mimetype !== "image/png"){
            throw new Error("Image not allowed")
        };

        const processedImage = shap(image.buffer).resize(500, 500);

        this.name = name;
        this.image = processedImage;
    }

    getName(): string {
        return this.name;
    };

    getImage(): shap.Sharp {
        return this.image;
    };
}