import characterRepository from "../../../infraestructure/repositories/character.repository";
import FindByWeightCharacterCommand from "../../commands/characters/findByWeight.character.command";
import configuration from '../../../../config';

export default new class FindByWeightCharacterHandler {
    async execute(command: FindByWeightCharacterCommand) {
        const characters = await characterRepository.findByWeight(command.getWeight());
        if (characters) {
            return characters.map((character) => {
                return {...character, image: `${configuration.getHost()}/characters/images/${character.getImage()}`}
            })
        }
        return null;
    }
}