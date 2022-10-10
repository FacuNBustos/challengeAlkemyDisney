import characterRepository from "../../../infraestructure/repositories/character.repository";
import FindByNameCharacterCommand from "../../commands/characters/findByName.character.command";
import configuration from '../../../../config';

export default new class FindByNameCharacterHandler {
    async execute(command: FindByNameCharacterCommand): Promise<any[] | null> {
        
        const characters = await characterRepository.findByName(command.getName());
        if (characters) {
            return characters.map((character) => {
                return {...character, image: `${configuration.getHost()}/characters/images/${character.getImage()}`}
            })
        }
        return null;
    }
}