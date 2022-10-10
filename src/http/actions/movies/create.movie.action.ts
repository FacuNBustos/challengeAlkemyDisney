import { Request, Response } from "express";
import CreateMovieCommand from "../../../application/commands/movies/create.movie.command";
import createMovieHandler from "../../../application/handlers/movies/create.movie.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class CreateMovieAction {
    async run(req: Request, res: Response) {
        try {

            await validateService.sessionToken(req.headers.authorization);

            const command = new CreateMovieCommand(
                req.body.title,
                req.body.creationDate,
                req.body.score,
                req.file,
                req.body.genresID.split(','),
                req.body.charactersID.split(',')
            );

            await createMovieHandler.execute(command);

            return res.status(201).json({message: 'Movie has been created'});
        } catch(error:any) {
            return res.status(400).json({message: error.message});
        }
    }
}