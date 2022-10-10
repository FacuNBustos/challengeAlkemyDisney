import Character from "../../../domain/entities/character.entity";
import characterRepository from "../../../infraestructure/repositories/character.repository";
import CreateCharacterCommand from "../../commands/characters/create.character.command";
import fs from 'fs';

export default new class CreateCharacterHandler {
    async execute(command: CreateCharacterCommand) {

        const characterSaved = await characterRepository.findOneByName(command.getName());

        if (characterSaved) throw new Error("The character already exists");

        const bufferImage = await command.getImage().toBuffer();
        const imageName = `${command.getName().replace(" ", "_")}_${Date.now()}.png`;
        fs.writeFileSync(`public/assets/characters/${imageName}`, bufferImage);

        const character = Character.create(
            command.getName(),
            command.getAge(),
            command.getWeight(),
            command.getHistory(),
            imageName
        );

        await characterRepository.create(character);

    }
}