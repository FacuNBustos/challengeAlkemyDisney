import movieRepository from "../../../infraestructure/repositories/movie.repository";
import FindByTitleMovieCommand from "../../commands/movies/findByTitle.movie.command";
import configuration from '../../../../config';

export default new class FindByTitleHandlerMovieHandler {
    async execute(command: FindByTitleMovieCommand) {
        const moviesSaves = await movieRepository.findByTitle(command.getTitle());

        if (moviesSaves) {
            return moviesSaves.map((movie) => {
                return {...movie.toPrimitives(), image: `${configuration.getHost()}/public/movies/images/${movie.getImage()}`}
            })
        };
        return null;
    }
}