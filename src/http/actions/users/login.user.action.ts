import { Request, Response } from "express";
import LoginUserCommand from "../../../application/commands/users/login.user.command";
import loginUserHandler from "../../../application/handlers/users/login.user.handler";

export default new class LoginUserAction {
    async run(req: Request, res: Response) {
        try {
            const command = new LoginUserCommand(
                req.body.email,
                req.body.password
            );
            
            const session = await loginUserHandler.execute(command);

            return res.status(201).json({token: session.getToken()})

        }catch(error: any){
            return res.status(404).json({message: error.message})
        }

    }
}