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
            await validateService.sessionToken(req.headers.authorization)
            .catch((error:any) => {
                return res.status(401).json({message: error.message})
            });

            if (req.query.title) {
                try {
                    const command = new FindByTitleMovieCommand(req.query.title);
                    const movies = await findByTitleMovieHandler.execute(command);

                    return res.status(200).json(movies);
                } catch(error: any) {
                    return res.status(400).json({message: error.message})
                }
            };

            if (req.query.genre) {
                try {
                    const command = new FindByGenreMovieCommand(req.query.genre);
                    const movies = await findByGenreMovieHandler.execute(command);

                    return res.status(200).json(movies);
                } catch(error: any) {
                    return res.status(400).json({message: error.message})
                }
            }

            if (req.query.order) {
                try {
                    const command = new FindByDateOrderMovieCommand(req.query.order);
                    const movies = await findByDateOrderMovieHandler.execute(command);

                    return res.status(200).json(movies);
                } catch(error: any) {
                    return res.status(400).json({message: error.message})
                }
            };

            const movies = await listMovieHandler.execute()
            .catch((error:any) => {
                return res.status(400).json({message: error.message})
            });

            return res.status(200).json(movies);
        } catch(error:any) {
            return res.status(404).json({message: error.message})
        }
    }
}