import characterRepository from "../../../infraestructure/repositories/character.repository";
import charactersMovieRepository from "../../../infraestructure/repositories/charactersMovie.repository";
import FindByMovieCharacterCommand from "../../commands/characters/findByMovie.character.command";
import configuration from '../../../../config';

export default new class FindByMovieCharacterHandler {
    async execute(command: FindByMovieCharacterCommand): Promise<any[] | null>{

        const charactersMovie = await charactersMovieRepository.findByMovieID(command.getMovie());
        const characters = [];

        if (charactersMovie) {
            for (let i = 0; i < charactersMovie.length; i++) {
                const character = await characterRepository.findOneById(charactersMovie[i].getCharacterID());
                if (character) {
                    characters.push({...character, image: `${configuration.getHost()}/characters/images/${character.getImage()}`});
                }
            }
            return characters;
        }
        return null;
    }
}