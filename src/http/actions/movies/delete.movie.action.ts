import { Request, Response } from "express";
import DeleteMovieCommand from "../../../application/commands/movies/delete.movie.command";
import deleteMovieHandler from "../../../application/handlers/movies/delete.movie.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class DeleteMovieAction {
    async run(req: Request, res: Response) {
        try {
            await validateService.sessionToken(req.headers.authorization);

            const command = new DeleteMovieCommand(req.params.id);

            await deleteMovieHandler.execute(command);

            return res.status(203).json({message: 'Movie has been deleted'});
        } catch(error:any) {
            return res.status(400).json({message: error.message});
        }
    }
}