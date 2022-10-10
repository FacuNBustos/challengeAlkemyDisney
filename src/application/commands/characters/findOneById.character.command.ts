import validate from "uuid-validate";

export default class FindOneByIdCharacterCommand {
    private readonly characterID: string;

    constructor(
        characterID: string
    ) {
        if (!characterID || !validate(characterID)) {
            throw new Error("Invalid identify");
        };

        this.characterID = characterID;
    };

    getCharacterID(): string {
        return this.characterID;
    };
}