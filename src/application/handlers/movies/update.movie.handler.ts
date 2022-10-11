import CharactersMovie from "../../../domain/entities/charactersMovie.entity";
import GenresMovie from "../../../domain/entities/genresMovie.entity";
import Movie from "../../../domain/entities/movie.entity";
import characterRepository from "../../../infraestructure/repositories/character.repository";
import charactersMovieRepository from "../../../infraestructure/repositories/charactersMovie.repository";
import genreRepository from "../../../infraestructure/repositories/genre.repository";
import genresMovieRepository from "../../../infraestructure/repositories/genresMovie.repository";
import movieRepository from "../../../infraestructure/repositories/movie.repository";
import UpdateMovieCommand from "../../commands/movies/update.movie.command";
import fs from 'fs';

export default new class UpdateMovieHandler {
    async execute(command: UpdateMovieCommand) {
        
        const movieSaved = await movieRepository.findOneById(command.getId());
        if (!movieSaved) throw new Error("Movie is missing");
        
        for (let i = 0; i < command.getCharactersID().length; i++) {
            const characterSaved = await characterRepository.findOneById(command.getCharactersID()[i]);
            if (!characterSaved) throw new Error("The character does not exist");
        };
        for (let i = 0; i < command.getGendersID().length; i++) {
            const genreSaved = await genreRepository.findOneById(command.getGendersID()[i]);
            if (!genreSaved) throw new Error("The genre does not exist");
        };
        
        const bufferImage = await command.getImage().toBuffer();
        const imageName = `${command.getTitle().replace(" ", "_")}_${Date.now()}.png`;

        const movie = Movie.fromPrimitives({
            id: command.getId(),
            title: command.getTitle(),
            creationDate: command.getCreationDate(),
            score: command.getScore(),
            image: imageName
        });

        await charactersMovieRepository.deleteByMovieID(command.getId());
        command.getCharactersID().forEach((characterID) => {
            const charactersMovie = CharactersMovie.create(
                characterID,
                movie.getId()
            );
            charactersMovieRepository.create(charactersMovie);
        })

        await genresMovieRepository.deleteByMovieId(command.getId());
        command.getGendersID().forEach((genreID) => {
            const genresMovie = GenresMovie.create(
                genreID,
                movie.getId()
            );
            genresMovieRepository.create(genresMovie);
        })

        await movieRepository.updateById(movie.getId(), {
            title: movie.getTitle(),
            creationDate: movie.getCreationDate(),
            score: movie.getScore(),
            image: movie.getImage()
        });

        fs.rmSync(`public/assets/movies/${movieSaved.getImage()}`);
        fs.writeFileSync(`public/assets/movies/${imageName}`, bufferImage);
    }
}