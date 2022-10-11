import shap from "sharp";
import validate from "uuid-validate";
import { Undefinable } from '../../../domain/valueObjects/Undefinable';
import validateService from "../../../infraestructure/services/validate.service";

export default class UpdateMovieCommand {
    private readonly id: string;
    private readonly title: string;
    private readonly creationDate: Date;
    private readonly score: number;
    private readonly image: shap.Sharp;
    private readonly genresID: Array<string>;
    private readonly charactersID: Array<string>;

    constructor(
        id: string,
        title: string,
        creationDate: string,
        score: string,
        image: Undefinable<Express.Multer.File>,
        genresID: string[],
        charactersID: string[]
    ) {
        if (!validate(id)) throw new Error("Invalid movie id");

        if (!validateService.fullname(title) || title.length < 5) {
            throw new Error("Invalid title");
        };

        if(!creationDate || creationDate.split('-').length !== 3) {
            throw new Error("Invalid creation date");
        };

        if (!validateService.number(score) || Number(score) <= 0 || Number(score) >= 6) {
            throw new Error("Invalid score");
        };

        if (!genresID || !charactersID) {
            throw new Error("genres and characters are required");
        };

        genresID.forEach((elem) => {
            if (!validate(elem)) {
                throw new Error("Invalid genre id");
            }
        });

        charactersID.forEach((elem) => {
            if (!validate(elem)) {
                throw new Error("Invalid character id");
            }
        });

        const [mount, day, year] = creationDate.split("-")
        if (!validateService.number(mount) || !validateService.number(day) || !validateService.number(year) ) {
            throw new Error("Invalid creation date");
        };
        const date = new Date(Number(year), Number(mount)-1 , Number(day));

        if (!image || image.mimetype !== "image/jpeg" && image.mimetype !== "image/png"){
            throw new Error("Image not allowed")
        };
        const processedImage = shap(image.buffer).resize(500, 500);

        this.id = id;
        this.title = title;
        this.creationDate = date;
        this.score = Number(score);
        this.image = processedImage;
        this.genresID = genresID;
        this.charactersID = charactersID;
    }

    getId(): string {
        return this.id
    };
    
    getTitle(): string {
        return this.title;
    };

    getCreationDate(): Date {
        return this.creationDate;
    };

    getScore(): number {
        return this.score;
    };

    getImage(): shap.Sharp {
        return this.image;
    };

    getGendersID(): Array<string> {
        return this.genresID;
    };

    getCharactersID(): Array<string> {
        return this.charactersID;
    };
}