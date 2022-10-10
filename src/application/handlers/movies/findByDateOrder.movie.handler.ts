import movieRepository from "../../../infraestructure/repositories/movie.repository";
import FindByDateOrderMovieCommand from "../../commands/movies/findByDateOrder.movie.command";

export default new class FindByDateOrderMovieHandler {
    async execute(command: FindByDateOrderMovieCommand) {
        const moviesSaved = await movieRepository.findAll();

        if (moviesSaved) {
            if (command.getOrder() === "ASC") {
                return moviesSaved.sort((a, b) => {
                    return a.getCreationDate().getTime() - b.getCreationDate().getTime();
                })
            };

            if (command.getOrder() === "DESC") {
                return moviesSaved.sort((a, b) => {
                    return b.getCreationDate().getTime() - a.getCreationDate().getTime();
                })
            };
        }
        return null;
    }
}