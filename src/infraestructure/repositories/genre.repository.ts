import commonSqlite from "./common.sqlite";
import { DataTypes } from 'sequelize';
import Genre from "../../domain/entities/genre.entity";

export default new class GenreRepository {
    private genreModel = commonSqlite.getConnection().define(
        'genres',
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    async create(genre: Genre): Promise<void> {
        const genreBuild = this.genreModel.build({
            id: genre.getId(),
            name: genre.getName(),
            image: genre.getImage()
        });

        await genreBuild.save();
    };

    async findAll(): Promise<Genre[] | null> {
        const genresSaved = await this.genreModel.findAll();

        if (genresSaved && genresSaved.length >= 1) {
            return genresSaved.map((genre) => {
                return Genre.fromPrimitives(genre);
            })
        };
        return null;
    }

    async findOneByName(name: string): Promise<Genre | null> {
        const genreSaved = await this.genreModel.findOne({
            where: {
                name: name
            }
        })

        return (genreSaved)? Genre.fromPrimitives(genreSaved) : null;
    };

    async findOneById(id: string): Promise<Genre | null> {
        const genreSaved = await this.genreModel.findOne({
            where:{
                id: id
            }
        });

        return (genreSaved)? Genre.fromPrimitives(genreSaved) : null;
    }

}