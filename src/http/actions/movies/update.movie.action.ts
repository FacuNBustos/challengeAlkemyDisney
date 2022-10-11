import { Request, Response } from "express";
import UpdateMovieCommand from "../../../application/commands/movies/update.movie.command";
import updateMovieHandler from "../../../application/handlers/movies/update.movie.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class UpdateMovieAction {
    async run(req: Request, res: Response) {
        try{
            try {
                await validateService.sessionToken(req.headers.authorization)
                .catch((error:any) => {
                    return res.status(401).json({message: error.message})
                });

                const command = new UpdateMovieCommand(
                    req.params.id,
                    req.body.title,
                    req.body.creationDate,
                    req.body.score,
                    req.file,
                    req.body.genresID.split(','),
                    req.body.charactersID.split(',')
                );
                await updateMovieHandler.execute(command);

            } catch(error: any) {
                return res.status(400).json({message: error.message})
            };

            return res.status(201).json({message: 'Movie has been updated'});
        } catch(error: any) {
            return res.status(404).json({message: error.message});
        }
    }
}