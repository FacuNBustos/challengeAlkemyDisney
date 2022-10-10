import fs from 'fs';
import Genre from '../../../domain/entities/genre.entity';
import genreRepository from '../../../infraestructure/repositories/genre.repository';
import CreateGenreCommand from '../../commands/genres/create.genre.command';

export default new class CreateGenreHandler {
    async execute(command: CreateGenreCommand) {

        const genreSaved = await genreRepository.findOneByName(command.getName());
        if (genreSaved) {
            throw new Error("A character with the same name already exists")
        };

        const bufferImage = await command.getImage().toBuffer();
        const imageName = `${command.getName()}_${Date.now()}.png`
        fs.writeFileSync(`public/assets/genres/${imageName}`, bufferImage);

        const genre = Genre.create(
            command.getName(),
            imageName
        );

        await genreRepository.create(genre);

    }
}