import { Sequelize } from 'sequelize';

export default new class CommonSqlite{
    private sequelize = new Sequelize('disney', 'user', 'pass', {
        dialect: 'sqlite',
        host: './dev.sqlite'
    })

    getConnection(): Sequelize {
        return this.sequelize;
    };
}