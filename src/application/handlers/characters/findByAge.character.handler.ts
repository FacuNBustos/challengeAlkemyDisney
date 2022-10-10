import characterRepository from "../../../infraestructure/repositories/character.repository";
import FindByAgeCharacterCommand from "../../commands/characters/findByAge.character.command";
import configuration from '../../../../config';

export default new class FindByAgeCharacterHandler {
    async execute(command: FindByAgeCharacterCommand): Promise<any[] | null> {
        
        const characters = await characterRepository.findByAge(command.getAge());
        if (characters) {
            return characters.map((character) => {
                return {...character, image: `${configuration.getHost()}/characters/images/${character.getImage()}`}
            })
        }
        return null;
    }
}