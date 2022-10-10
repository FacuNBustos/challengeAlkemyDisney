import { Model, DataTypes } from 'sequelize'
import User from '../../domain/entities/user.entity'
import commonSqlite from './common.sqlite'

export default new class UserRepository {
    private userModel = commonSqlite.getConnection().define(
        'users',
        {
            id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    async create(user: User): Promise<void> {
        const userBuild = this.userModel.build({
            id: user.getId(),
            email: user.getEmail(),
            password: user.getPassword()
        });

        await userBuild.save();
    };

    async findOneByEmail(email: string): Promise<User | null> {
        const userSaved = await this.userModel.findOne({
            where: {
                email: email
            }
        });

        return (userSaved)? User.fromPrimitives(userSaved) : null;
    }
}