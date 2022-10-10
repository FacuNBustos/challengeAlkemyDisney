import { Request, Response } from "express";
import FindOneByIdCharacterCommand from "../../../application/commands/characters/findOneById.character.command";
import findOneByIdCharacterHandler from "../../../application/handlers/characters/findOneById.character.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class FindOneByIdCharacterAction {
    async run(req: Request, res: Response) {
        try {

            await validateService.sessionToken(req.headers.authorization);

            const command = new FindOneByIdCharacterCommand(req.params.id);
            
            const characterDetails = await findOneByIdCharacterHandler.execute(command);

            return res.status(200).json(characterDetails);
        } catch(error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}