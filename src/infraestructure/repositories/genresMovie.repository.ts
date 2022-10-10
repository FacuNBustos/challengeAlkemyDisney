import { DataTypes } from 'sequelize'
import GenresMovie from '../../domain/entities/genresMovie.entity';
import commonSqlite from './common.sqlite'

export default new class GenresMovieRepository {
    private genresMovieModel = commonSqlite.getConnection().define(
        'genresMovies',
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            genreID: {
                type: DataTypes.STRING,
                allowNull: false
            },
            movieID: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    async create(genresMovie: GenresMovie): Promise<void> {
        await this.genresMovieModel.destroy({
            where:{
                genreID: genresMovie.getGenreID(),
                movieID: genresMovie.getMovieID()
            }
        });
        const genresMovieBuild = this.genresMovieModel.build({
            id: genresMovie.getId(),
            genreID: genresMovie.getGenreID(),
            movieID: genresMovie.getMovieID()
        });

        await genresMovieBuild.save();
    };

    async findByMovieID(movieID: string): Promise<GenresMovie[] | null> {
        const genresMovieSaved = await this.genresMovieModel.findAll({
            where:{
                movieID: movieID
            }
        });

        if (genresMovieSaved && genresMovieSaved.length >= 1) {
            return genresMovieSaved.map((genreMovie) => {
                return GenresMovie.fromPrimitives(genreMovie);
            })
        };
        
        return null;
    };

    async findByGenreID(genreID: string): Promise<GenresMovie[] | null> {
        const genresMovieSaved = await this.genresMovieModel.findAll({
            where:{
                genreID: genreID
            }
        });

        if (genresMovieSaved) {
            return genresMovieSaved.map((genreMovie) => {
                return GenresMovie.fromPrimitives(genreMovie);
            })
        };
        
        return null;
    }

    async deleteByMovieId(movieID: string): Promise<void> {
        await this.genresMovieModel.destroy({
            where: {
                movieID: movieID
            }
        });
    }
}