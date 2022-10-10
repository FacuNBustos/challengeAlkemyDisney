import Character from "../../../domain/entities/character.entity";
import characterRepository from "../../../infraestructure/repositories/character.repository";
import UpdateCharacterCommand from "../../commands/characters/update.character.command";
import fs from 'fs';

export default new class UpdateCharacterHandler {
    async execute(command: UpdateCharacterCommand) {

        const characterSaved = await characterRepository.findOneById(command.getId());
        if (!characterSaved) throw new Error("The character has not been found");

        console.log(characterSaved);
        fs.rmSync(`public/assets/characters/${characterSaved.getImage()}`);
        const bufferImage = await command.getImage().toBuffer();
        const imageName = `${command.getName().replace(" ", "_")}_${Date.now()}.png`;
        fs.writeFileSync(`public/assets/characters/${imageName}`, bufferImage);

        const character = Character.fromPrimitives({
            id: command.getId(),
            name: command.getName(),
            age: command.getAge(),
            weight: command.getWeight(),
            history: command.getHistory(),
            image: imageName
        });

        await characterRepository.updateById(character.getId(), {
            name: character.getName(),
            age: character.getAge(),
            weight: character.getWeight(),
            history: character.getHistory(),
            image: character.getImage()
        });
    }
}