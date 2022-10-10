import validate from "uuid-validate";

export default class DeleteCharacterCommand {
    private readonly characterID: string;

    constructor(
        characterID: string
    ) {
        if (!characterID || !validate(characterID)) {
            throw new Error("Id sintax error");
        };

        this.characterID = characterID;
    };

    getCharacterID(): string {
        return this.characterID;
    };
}