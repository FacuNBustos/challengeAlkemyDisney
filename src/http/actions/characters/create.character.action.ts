import { Request, Response } from "express";
import CreateCharacterCommand from "../../../application/commands/characters/create.character.command";
import createCharacterHandler from "../../../application/handlers/characters/create.character.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class CreateChacterAction {
    async run(req: Request, res: Response) {
        try {
            try {
                await validateService.sessionToken(req.headers.authorization)
                .catch((error) => {
                    return res.status(401).json({message: error})
                });

                const command = new CreateCharacterCommand(
                    req.body.name,
                    req.body.age,
                    req.body.weight,
                    req.body.history,
                    req.file
                );
                await createCharacterHandler.execute(command);

            } catch (error: any) {
                return res.status(400).json({message: error.message});
            };

            return res.status(201).json({message: "Character has been created"});
        } catch (error: any) {
            return res.status(404).json({message: error.message});
        }
    }
}