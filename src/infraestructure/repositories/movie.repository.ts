import commonSqlite from "./common.sqlite";
import { DataTypes, Op } from 'sequelize';
import Movie from "../../domain/entities/movie.entity";

export default new class MovieRepository {
    private movieModel = commonSqlite.getConnection().define(
        'movies',
        {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            creationDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            score: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    async create(movie: Movie): Promise<void> {
        const movieBuild = this.movieModel.build({
            id: movie.getId(),
            title: movie.getTitle(),
            creationDate: movie.getCreationDate(),
            score: movie.getScore(),
            image: movie.getImage(),
        });

        await movieBuild.save();
    };

    async updateById(id: string, primitives: any): Promise<void> {
        await this.movieModel.update(primitives, {
            where: {
                id: id
            }
        })
    }

    async findAll(): Promise<Movie[] | null> {
        const moviesSaved = await this.movieModel.findAll();

        if (moviesSaved && moviesSaved.length >= 1) {
            return moviesSaved.map((movie) => {
                return Movie.fromPrimitives(movie);
            })
        };
        return null;
    };

    async findByTitle(title: string) : Promise<Movie[] | null> {
        const moviesSaved = await this.movieModel.findAll({
            where: {
                title: {
                    [Op.startsWith]: title
                }
            }
        });

        if (moviesSaved && moviesSaved.length >= 1) {
            return moviesSaved.map((movie) => {
                return Movie.fromPrimitives(movie);
            })
        };
        return null;
    }

    async findOneById(id: string): Promise<Movie | null> {
        const movieSaved = await this.movieModel.findOne({
            where: {
                id: id
            }
        });

        return (movieSaved)? Movie.fromPrimitives(movieSaved) : null;
    };

    async findOneByTitle(title: string): Promise<Movie | null> {
        const movieSaved = await this.movieModel.findOne({
            where:{
                title: title
            }
        });

        return (movieSaved)? Movie.fromPrimitives(movieSaved) : null;
    };

    async deleteById(movieID: string): Promise<void> {
        await this.movieModel.destroy({
            where: {
                id: movieID
            }
        });
    }

}

