import { Request, Response } from "express";
import CreateUserCommand from "../../../application/commands/users/create.user.command";
import createUserHandler from "../../../application/handlers/users/create.user.handler";

export default new class CreateUserAction {
    async run(req: Request, res: Response) {
        try {
            try {
                const command = new CreateUserCommand(
                    req.body.email,
                    req.body.password
                );

                await createUserHandler.execute(command)

            } catch (error: any) {
                return res.status(400).json({message: error.message})
            };

            return res.status(201).json({ message: "User has been created"});
        }catch (error: any) {
            return res.status(404).json({message: error.message})
        }
    }
}