import { Request, Response } from "express";
import DeleteCharacterCommand from "../../../application/commands/characters/delete.character.command";
import deleteCharacterHandler from "../../../application/handlers/characters/delete.character.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class DeleteCharacterAction {
    async run(req: Request, res: Response) {
        try {
            await validateService.sessionToken(req.headers.authorization);

            const command = new DeleteCharacterCommand(req.params.id);

            await deleteCharacterHandler.execute(command);

            return res.status(201).json({messgae: 'Character has been deleted'});
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}