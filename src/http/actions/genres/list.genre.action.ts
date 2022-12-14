import { Request, Response } from "express";
import listGenreHandler from "../../../application/handlers/genres/list.genre.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class ListGenreAction {
    async run(req: Request, res: Response) {
        try {
            try {
                await validateService.sessionToken(req.headers.authorization)
                .catch((error:any) => {
                    return res.status(401).json({message: error.message})
                });

                var genres = await listGenreHandler.execute();
            
            } catch(error: any) {
                return res.status(400).json({message: error.message})
            };

            return res.status(200).json(genres);
        } catch(error: any) {
            return res.status(404).json({message: error.message});
        } 
    }
}