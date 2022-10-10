import commonSqlite from "./common.sqlite";
import { DataTypes } from 'sequelize';
import Session from "../../domain/entities/session.entity";

export default new class SessionRepository {
    private sessionModel = commonSqlite.getConnection().define(
        'sessions',
        {
            token: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            userID: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    );

    async create(session: Session): Promise<Session> {
        const sessionBuild = this.sessionModel.build({
            token: session.getToken(),
            userID: session.getUserID()
        });

        await sessionBuild.save();
        return Session.fromPrimitives(sessionBuild);
    };

    async findOneByUserID(userID: string): Promise<Session | null> {
        const sessionSaved = await this.sessionModel.findOne({
            where: {
                userID: userID
            }
        });

        return (sessionSaved)? Session.fromPrimitives(sessionSaved) : null;
    }

    async findOneByToken(token: string): Promise<Session | null> {
        const sessionSaved = await this.sessionModel.findOne({
            where: {
                token: token
            }
        });

        return (sessionSaved)? Session.fromPrimitives(sessionSaved) : null;
    }

}