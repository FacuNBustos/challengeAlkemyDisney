import validate from "uuid-validate";

export default class FindOneByIdCharacterCommand {
    private readonly characterID: string;

    constructor(
        characterID: string
    ) {
        if (!characterID || !validate(characterID)) {
            throw new Error("Invalid character id");
        };

        this.characterID = characterID;
    };

    getCharacterID(): string {
        return this.characterID;
    };
}