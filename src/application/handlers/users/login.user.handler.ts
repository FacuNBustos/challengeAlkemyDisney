import User from "../../../domain/entities/user.entity";
import { Nullable } from "../../../domain/valueObjects/Nullable";
import userRepository from "../../../infraestructure/repositories/user.repository";
import hashService from "../../../infraestructure/services/hash.service";
import CreateSessionCommand from "../../commands/sessions/create.session.command";
import LoginUserCommand from "../../commands/users/login.user.command";
import createSessionHandler from "../sessions/create.session.handler";

export default new class LoginUserHandler {
    async execute(command: LoginUserCommand) {
        
        const savedUser: Nullable<User> = await userRepository.findOneByEmail(command.getEmail());

        if (!savedUser) throw new Error("Nonexistent user");

        if (!hashService.HashCompare(command.getPassword(), savedUser.getPassword())) {
            throw new Error("Wrong password");
        };

        const sessionCommand = new CreateSessionCommand(
            savedUser.getId()
        );

        return await createSessionHandler.execute(sessionCommand);
    }
}