import commonSqlite from "./common.sqlite";
import { DataTypes, Op } from 'sequelize';
import Character from "../../domain/entities/character.entity";

export default new class CharacterRepository {
    private characterModel = commonSqlite.getConnection().define(
        'characters',
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
            age: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            weight: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            history: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            }
           
        }
    );

    async create(character: Character): Promise<void> {
        const characterBuild = this.characterModel.build({
            id: character.getId(),
            name: character.getName(),
            age: character.getAge(),
            weight: character.getWeight(),
            history: character.getHistory(),
            image: character.getImage()
        });

        await characterBuild.save();
    };

    async findOneByName(name: string): Promise<Character | null> {
        const characterSaved = await this.characterModel.findOne({
            where: {
                name: name
            }
        })

        return (characterSaved)? Character.fromPrimitives(characterSaved) : null;
    };

    async findAll(): Promise<Character[] | null> {
        const charactersSaved = await this.characterModel.findAll();

        if (charactersSaved) {
            return charactersSaved.map((elem) => {
                return Character.fromPrimitives(elem);
            });
        };
        
        return null;
    };

    async findOneById(id: string): Promise<Character | null> {
        const characterSaved = await this.characterModel.findOne({
            where: {
                id: id
            }
        });

        if (characterSaved) {
            return Character.fromPrimitives(characterSaved);
        };

        return null;
    };

    async findByName(name: string): Promise<Character[] | null> {
        const charactersSaved = await this.characterModel.findAll({
            where:{
                name: {
                    [Op.startsWith]: name
                }
            }
        });

        if (charactersSaved) {
            return charactersSaved.map((character) => {
                return Character.fromPrimitives(character)
            })
        };
        return null;
    }

    async findByAge(age: number): Promise<Character[] | null> {
        const charactersSaved = await this.characterModel.findAll({
            where: {
                age: age
            }
        });

        if (charactersSaved) {
            return charactersSaved.map((character) => {
                return Character.fromPrimitives(character)
            })
        };
        return null;
    };

    async findByWeight(weight: number): Promise<Character[] | null> {
        const charactersSaved = await this.characterModel.findAll({
            where: {
                weight: weight
            }
        });

        if (charactersSaved) {
            return charactersSaved.map((character) => {
                return Character.fromPrimitives(character)
            })
        };
        return null;
    };

    async deleteById(id: string): Promise<void> {
        await this.characterModel.destroy({
            where: {
                id: id
            }
        })
    };

    async updateById(id: string, primitives: any): Promise<void> {
        await this.characterModel.update(primitives, {
            where: {
                id: id
            }
        })
    }

}