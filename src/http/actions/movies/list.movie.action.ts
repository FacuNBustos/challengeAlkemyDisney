import { Request, Response } from "express";
import FindByDateOrderMovieCommand from "../../../application/commands/movies/findByDateOrder.movie.command";
import FindByGenreMovieCommand from "../../../application/commands/movies/findByGenre.movie.command";
import FindByTitleMovieCommand from "../../../application/commands/movies/findByTitle.movie.command";
import findByDateOrderMovieHandler from "../../../application/handlers/movies/findByDateOrder.movie.handler";
import findByGenreMovieHandler from "../../../application/handlers/movies/findByGenre.movie.handler";
import findByTitleMovieHandler from "../../../application/handlers/movies/findByTitle.movie.handler";
import listMovieHandler from "../../../application/handlers/movies/list.movie.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class ListMoviesAction {
    async run(req: Request, res: Response) {
        try {
            await validateService.sessionToken(req.headers.authorization);

            if (req.query.title) {
                const command = new FindByTitleMovieCommand(req.query.title);
                const movies = await findByTitleMovieHandler.execute(command);

                return res.status(200).json(movies);
            };

            if (req.query.genre) {
                const command = new FindByGenreMovieCommand(req.query.genre);
                const movies = await findByGenreMovieHandler.execute(command);

                return res.status(200).json(movies);
            }

            if (req.query.order) {
                const command = new FindByDateOrderMovieCommand(req.query.order);
                const movies = await findByDateOrderMovieHandler.execute(command);

                return res.status(200).json(movies);
            };

            const movies = await listMovieHandler.execute();

            return res.status(200).json(movies);
        } catch(error:any) {
            return res.status(200).json({message: error.message})
        }
    }
}