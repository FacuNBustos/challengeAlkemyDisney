import genresMovieRepository from "../../../infraestructure/repositories/genresMovie.repository";
import movieRepository from "../../../infraestructure/repositories/movie.repository";
import FindByGenreMovieCommand from "../../commands/movies/findByGenre.movie.command";
import configuration from '../../../../config';

export default new class FindByGenreMovieHandler {
    async execute(command: FindByGenreMovieCommand) {
        const genresMoviesSaved = await genresMovieRepository.findByGenreID(command.getGenre());

        if (genresMoviesSaved) {
            const movies = [];
            for (let i = 0; i < genresMoviesSaved.length; i++) {
                const movie = await movieRepository.findOneById(genresMoviesSaved[i].getMovieID());
                if (movie) movies.push({...movie.toPrimitives(), image: `${configuration.getHost()}/public/movies/images/${movie.getImage()}`});
            }
            return movies;
        }
        return null;
    }
}