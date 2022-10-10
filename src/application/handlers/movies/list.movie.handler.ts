import movieRepository from "../../../infraestructure/repositories/movie.repository";
import configuration from '../../../../config';

export default new class ListMovieHandler {
    async execute(): Promise<any[] | null> {
        const moviesSaved = await movieRepository.findAll();

        if (moviesSaved) {
            const movies = moviesSaved.map((movie) => {
                return {id: movie.getId(),
                    title: movie.getTitle(),
                    creationDate: movie.getCreationDate(),
                    image: `${configuration.getHost()}/movies/images/${movie.getImage()}` 
                };
            })
            return movies;
        }
        return null;
    }
}