import Movie from "../../../domain/entities/movie.entity";
import characterRepository from "../../../infraestructure/repositories/character.repository";
import genreRepository from "../../../infraestructure/repositories/genre.repository";
import CreateMovieCommand from "../../commands/movies/create.movie.command";
import movieRepository from "../../../infraestructure/repositories/movie.repository";
import fs from "fs";
import CharactersMovie from "../../../domain/entities/charactersMovie.entity";
import charactersMovieRepository from "../../../infraestructure/repositories/charactersMovie.repository";
import GenresMovie from "../../../domain/entities/genresMovie.entity";
import genresMovieRepository from "../../../infraestructure/repositories/genresMovie.repository";

export default new class CreateMovieHandler {
    async execute(command: CreateMovieCommand) {

        for (let i = 0; i < command.getCharactersID().length; i++) {
            const characterSaved = await characterRepository.findOneById(command.getCharactersID()[i]);
            if (!characterSaved) throw new Error("The character does not exist");
        };
        for (let i = 0; i < command.getGendersID().length; i++) {
            const genreSaved = await genreRepository.findOneById(command.getGendersID()[i]);
            if (!genreSaved) throw new Error("The genre does not exist");
        };

        const movieSaved = await movieRepository.findOneByTitle(command.getTitle());
        if (movieSaved) throw new Error("There is already a movie with the same title");

        const bufferImage = await command.getImage().toBuffer();
        const imageName = `${command.getTitle().replace(" ", "_")}_${Date.now()}.png`;

        const movie = Movie.create(
            command.getTitle(),
            command.getCreationDate(),
            command.getScore(),
            imageName
        );

        command.getCharactersID().forEach((characterID) => {
            const charactersMovie = CharactersMovie.create(
                characterID,
                movie.getId()
            );
            charactersMovieRepository.create(charactersMovie);
        })

        command.getGendersID().forEach((genreID) => {
            const genresMovie = GenresMovie.create(
                genreID,
                movie.getId()
            );
            genresMovieRepository.create(genresMovie);
        })

        await movieRepository.create(movie);
        fs.writeFileSync(`public/assets/movies/${imageName}`, bufferImage);
    }
}