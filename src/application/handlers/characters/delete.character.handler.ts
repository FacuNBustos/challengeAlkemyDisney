import characterRepository from "../../../infraestructure/repositories/character.repository";
import DeleteCharacterCommand from "../../commands/characters/delete.character.command";
import fs from "fs";
import charactersMovieRepository from "../../../infraestructure/repositories/charactersMovie.repository";

export default new class DeleteCharacterHandler {
    async execute(command: DeleteCharacterCommand) {

        const characterSaved = await characterRepository.findOneById(command.getCharacterID());

        if (!characterSaved) throw new Error("Username does not exist");
        
        fs.rmSync(`public/assets/characters/${characterSaved.getImage()}`);
        await characterRepository.deleteById(command.getCharacterID());
        await charactersMovieRepository.deleteByCharacterID(command.getCharacterID());
    }
}