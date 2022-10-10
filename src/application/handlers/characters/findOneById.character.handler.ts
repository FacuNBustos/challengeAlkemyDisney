import characterRepository from "../../../infraestructure/repositories/character.repository";
import charactersMovieRepository from "../../../infraestructure/repositories/charactersMovie.repository";
import movieRepository from "../../../infraestructure/repositories/movie.repository";
import FindOneByIdCharacterCommand from "../../commands/characters/findOneById.character.command";
import configuration from '../../../../config';

export default new class FindOneByIdCharacterhandler {
    async execute(command: FindOneByIdCharacterCommand): Promise<any> {
        const characterSaved = await characterRepository.findOneById(command.getCharacterID());
        if (!characterSaved) throw new Error("inexistent character");
        const characterImage = characterSaved.getImage();
        let characterDatails = {...characterSaved.toPrimitives(), image: `${configuration.getHost()}/characters/images/${characterImage}`};

        const characterMovies = await charactersMovieRepository.findByCharacterID(command.getCharacterID());
        const movies = [];
        if (characterMovies) {
            for (let i = 0; i < characterMovies.length; i++) {
                const movie = await movieRepository.findOneById(characterMovies[i].getMovieID());
                if (movie) {
                    const image = movie.getImage();
                    movies.push({...movie.toPrimitives(), image: `${configuration.getHost()}/movies/images/${image}`});
                };
            }
            characterDatails = {...characterDatails, movies: movies}
        }
        return characterDatails;
    }
}