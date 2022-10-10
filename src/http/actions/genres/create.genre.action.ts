import { Request, Response } from "express";
import CreateGenreCommand from "../../../application/commands/genres/create.genre.command";
import createGenreHandler from "../../../application/handlers/genres/create.genre.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class CreateGenreAction {
    async run(req: Request, res: Response) {
        try {
            try {

                await validateService.sessionToken(req.headers.authorization);

                const command = new CreateGenreCommand(
                    req.body.name,
                    req.file
                );

                await createGenreHandler.execute(command);
                    
            } catch (error: any) {
                return res.status(401).json({ message: error.message });
            }

            return res.status(201).json({message: "Genre has been created"});
        } catch (error:any ){
            return res.status(400).json({message: error.message});
        }
    }
}