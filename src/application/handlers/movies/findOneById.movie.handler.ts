import characterRepository from "../../../infraestructure/repositories/character.repository";
import charactersMovieRepository from "../../../infraestructure/repositories/charactersMovie.repository";
import genreRepository from "../../../infraestructure/repositories/genre.repository";
import genresMovieRepository from "../../../infraestructure/repositories/genresMovie.repository";
import movieRepository from "../../../infraestructure/repositories/movie.repository";
import FindOneByIdMovieCommand from "../../commands/movies/findOneById.movie.command";
import configuration from '../../../../config';

export default new class FindOneByIdMovieHandler {
    async execute(command: FindOneByIdMovieCommand) {
        const movieSaved = await movieRepository.findOneById(command.getMovieID());
        if (!movieSaved) throw new Error("movie is missing");
        let movie = movieSaved.toPrimitives();

        const charactersMovie = await charactersMovieRepository.findByMovieID(movieSaved.getId());
        const characters = []
        if (charactersMovie) {
            for (let i = 0; i < charactersMovie.length; i++) {
                const character = await characterRepository.findOneById(charactersMovie[i].getCharacterID());
                if (character) characters.push({...character, image: `${configuration.getHost()}/characters/images/${character.getImage()}`});
            }
            movie = {...movie, characters: characters}
        };

        const genresMovie = await genresMovieRepository.findByMovieID(movieSaved.getId());
        const genres = [];
        if (genresMovie) {
            for (let i = 0; i < genresMovie.length; i++) {
                const genre = await genreRepository.findOneById(genresMovie[i].getGenreID()); 
                if (genre) genres.push({...genre, image: `${configuration.getHost()}/genres/images/${genre.getImage()}`});
            }
            movie = {...movie, genres: genres };
        };

        return {...movie, image: `${configuration.getHost()}/movies/images/${movieSaved.getImage()}`}
    }
}