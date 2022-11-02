import express from "express";
import cors from 'cors';
import { log } from 'debug';
import expressWinston from 'express-winston';
import winston from 'winston';
import CommonRoutes from "./http/routes/Common.routes";
import UserRoutes from "./http/routes/User.routes";
import commonSqlite from "./infraestructure/repositories/common.sqlite";
import CharacterRoutes from "./http/routes/Character.routes";
import GenreRoutes from "./http/routes/Genre.routes";
import MovieRoutes from "./http/routes/Movie.routes";
import configuration from '../config';

const app: express.Application = express();

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false;
};

app.use(expressWinston.logger(loggerOptions));

const routes: Array<CommonRoutes> = [];
app.use(cors());
app.use(express.json());

routes.push(new UserRoutes(app));
routes.push(new CharacterRoutes(app));
routes.push(new GenreRoutes(app));
routes.push(new MovieRoutes(app));

commonSqlite.getConnection().sync().then(()=> log("db is ready"));
app.listen(configuration.getHost(), () => {
  routes.forEach((route: CommonRoutes) => {
    log(`Routes configured for ${route.getName()}`);
  });
  log('Server listening on port ' + configuration.getHost());
});