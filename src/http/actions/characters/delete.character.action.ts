import { Request, Response } from "express";
import DeleteCharacterCommand from "../../../application/commands/characters/delete.character.command";
import deleteCharacterHandler from "../../../application/handlers/characters/delete.character.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class DeleteCharacterAction {
    async run(req: Request, res: Response) {
        try {
            try {
                await validateService.sessionToken(req.headers.authorization)
                .catch((error: any) => {
                    return res.status(401).json({message: error.message})
                });

                const command = new DeleteCharacterCommand(req.params.id);
                await deleteCharacterHandler.execute(command);

            } catch(error: any) {
                return res.status(400).json({message: error.message})
            };

            return res.status(204).json({messgae: 'Character has been deleted'});
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
}