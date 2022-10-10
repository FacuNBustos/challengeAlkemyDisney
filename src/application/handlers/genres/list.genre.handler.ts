import genreRepository from "../../../infraestructure/repositories/genre.repository";
import configuration from '../../../../config';

export default new class ListGenreHandler {
    async execute() {
        const genres = await genreRepository.findAll();

        if (genres) {
            return genres.map((genre) => {
                return {...genre, image: `${configuration.getHost()}/public/genres/images/${genre.getImage()}`}
            })
        }
    }
}