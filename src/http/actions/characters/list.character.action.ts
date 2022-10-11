import { Request, Response } from "express";
import FindByAgeCharacterCommand from "../../../application/commands/characters/findByAge.character.command";
import FindByMovieCharacterCommand from "../../../application/commands/characters/findByMovie.character.command";
import FindByNameCharacterCommand from "../../../application/commands/characters/findByName.character.command";
import FindByWeightCharacterCommand from "../../../application/commands/characters/findByWeight.character.command";
import findByAgeCharacterHandler from "../../../application/handlers/characters/findByAge.character.handler";
import findByMovieCharacterHandler from "../../../application/handlers/characters/findByMovie.character.handler";
import findByNameCharacterHandler from "../../../application/handlers/characters/findByName.character.handler";
import findByWeightCharacterHandler from "../../../application/handlers/characters/findByWeight.character.handler";
import listCharacterHandler from "../../../application/handlers/characters/list.character.handler";
import validateService from "../../../infraestructure/services/validate.service";

export default new class ListCharacterAction {
    async run(req: Request, res: Response) {
        try {
            await validateService.sessionToken(req.headers.authorization)
            .catch((error:any) => {
                return res.status(401).json({message: error.message})
            });

            if (req.query.name) {
                try {
                    const command = new FindByNameCharacterCommand(req.query.name);
                    const characters = await findByNameCharacterHandler.execute(command);

                    return res.status(200).json(characters);
                } catch(error: any) {
                    return res.status(400).json({message: error.message})
                }
            }

            if (req.query.age) {
                try {
                    const command = new FindByAgeCharacterCommand(req.query.age);
                    const characters = await findByAgeCharacterHandler.execute(command);

                    return res.status(200).json(characters);
                } catch(error: any) {
                    return res.status(400).json({message: error.message})
                }
            };

            if (req.query.weight) {
                try {
                    const command = new FindByWeightCharacterCommand(req.query.weight);
                    const characters = await findByWeightCharacterHandler.execute(command);

                    return res.status(200).json(characters);
                } catch(error: any) {
                    return res.status(400).json({message: error.message})
                }
            };

            if (req.query.movies) {
                try {
                    const command = new FindByMovieCharacterCommand(req.query.movies);
                    const characters = await findByMovieCharacterHandler.execute(command);

                    return res.status(200).json(characters);
                } catch(error: any) {
                    return res.status(400).json({message: error.message})
                }
            };

            const characters = await listCharacterHandler.execute()
            .catch((error:any) => {
                return res.status(400).json({message: error.message})
            });

            return res.status(200).json(characters);
        } catch(error: any) {
            return res.status(404).json({message: error.message});
        }

    }
}