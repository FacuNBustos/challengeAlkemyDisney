import { Request, Response } from "express";
import UpdateCharacterCommand from "../../../application/commands/characters/update.character.command";
import updateCharacterHandler from "../../../application/handlers/characters/update.character.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class UpdateCharactersAction {
    async run(req: Request, res: Response) {
        try {
            try {
                await validateService.sessionToken(req.headers.authorization)
                .catch((error:any) => {
                    return res.status(401).json({message: error.message})
                });

                const command = new UpdateCharacterCommand(
                    req.params.id,
                    req.body.name,
                    req.body.age,
                    req.body.weight,
                    req.body.history,
                    req.file
                );
                await updateCharacterHandler.execute(command);

            } catch(error:any) {
                return res.status(400).json({message: error.message})
            };

            return res.status(201).json({message: "Character has been updated"});
        }catch (error:any) {
            return res.status(404).json({message: error.message});
        }
    }
}