import { Request, Response } from "express";
import LoginUserCommand from "../../../application/commands/users/login.user.command";
import loginUserHandler from "../../../application/handlers/users/login.user.handler";

export default new class LoginUserAction {
    async run(req: Request, res: Response) {
        try {
            try {
                const command = new LoginUserCommand(
                    req.body.email,
                    req.body.password
                );

                var session = await loginUserHandler.execute(command)

            } catch (error: any) {
                return res.status(400).json({message: error.message})
            };
            
            return res.status(200).json({token: session.getToken()});
        }catch(error: any){
            return res.status(404).json({message: error.message})
        }
    }
}