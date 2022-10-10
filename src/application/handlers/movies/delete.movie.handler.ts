import charactersMovieRepository from "../../../infraestructure/repositories/charactersMovie.repository";
import genresMovieRepository from "../../../infraestructure/repositories/genresMovie.repository";
import movieRepository from "../../../infraestructure/repositories/movie.repository";
import DeleteMovieCommand from "../../commands/movies/delete.movie.command";
import fs from 'fs';

export default new class DeleteMovieHandler {
    async execute(command: DeleteMovieCommand) {
        const movieSaved = await movieRepository.findOneById(command.getMovieID());
        if (!movieSaved) throw new Error("the movie not exist");

        await movieRepository.deleteById(command.getMovieID());
        await charactersMovieRepository.deleteByMovieID(command.getMovieID());
        await genresMovieRepository.deleteByMovieId(command.getMovieID());
        fs.rmSync(`public/assets/movies/${movieSaved.getImage()}`);
    }
}