import { Request, Response } from "express";
import DeleteMovieCommand from "../../../application/commands/movies/delete.movie.command";
import deleteMovieHandler from "../../../application/handlers/movies/delete.movie.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class DeleteMovieAction {
    async run(req: Request, res: Response) {
        try {
            try {
                await validateService.sessionToken(req.headers.authorization)
                .catch((error:any) => {
                    return res.status(401).json({message: error.message})
                });

                const command = new DeleteMovieCommand(req.params.id);
                await deleteMovieHandler.execute(command);

            } catch(error: any) {
                return res.status(400).json({message: error.message})
            };

            return res.status(204).json({message: 'Movie has been deleted'});
        } catch(error:any) {
            return res.status(404).json({message: error.message});
        }
    }
}