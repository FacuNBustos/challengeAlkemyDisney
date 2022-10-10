import { DataTypes } from 'sequelize'
import CharactersMovie from '../../domain/entities/charactersMovie.entity';
import commonSqlite from './common.sqlite'

export default new class CharactersMovieRepository {
    private charactersMovieModel = commonSqlite.getConnection().define(
        'charactersMovies',
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            characterID: {
                type: DataTypes.STRING,
                allowNull: false
            },
            movieID: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    async create(charactersMovie: CharactersMovie): Promise<void> {
        await this.charactersMovieModel.destroy({
            where: {
                characterID: charactersMovie.getCharacterID(),
                movieID: charactersMovie.getMovieID()
            }
        });
        const charactersMovieBuild = this.charactersMovieModel.build({
            id: charactersMovie.getId(),
            characterID: charactersMovie.getCharacterID(),
            movieID: charactersMovie.getMovieID()
        });

        await charactersMovieBuild.save();
    };

    async findByCharacterID(characterID: string): Promise<CharactersMovie[] | null> {
        const characterMovies = await this.charactersMovieModel.findAll({
                where: {
                    characterID: characterID
                }
            })
        if (characterMovies && characterMovies.length >= 1) {
            return characterMovies.map((elem) => {
                return CharactersMovie.fromPrimitives(elem)
            });
        }
        return null;
    };

    async findByMovieID(movieID: string): Promise<CharactersMovie[] | null> {
        const charactersMovie = await this.charactersMovieModel.findAll({
            where: {
                movieID: movieID
            }
        });

        if (charactersMovie && charactersMovie.length >= 1) {
            return charactersMovie.map((characterMovie) => {
                return CharactersMovie.fromPrimitives(characterMovie)
            })
        }
        return null;
    }

    async deleteByCharacterID(characterID: string): Promise<void> {
        await this.charactersMovieModel.destroy({
            where:{
                characterID: characterID
            }
        })
    };

    async deleteByMovieID(movieID: string): Promise<void> {
        await this.charactersMovieModel.destroy({
            where: {
                movieID: movieID
            }
        });
    }
}