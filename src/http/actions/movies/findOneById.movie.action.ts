import { Request, Response } from "express";
import FindOneByIdMovieCommand from "../../../application/commands/movies/findOneById.movie.command";
import findOneByIdMovieHandler from "../../../application/handlers/movies/findOneById.movie.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class FindByIdMovieAction {
    async run(req: Request, res: Response) {
        try {
            await validateService.sessionToken(req.headers.authorization);

            const command = new FindOneByIdMovieCommand(req.params.id);

            const movies = await findOneByIdMovieHandler.execute(command);

            return res.status(200).json(movies);
        } catch(error: any) {
            return res.status(400).json({message: error.message});
        }
    }
}