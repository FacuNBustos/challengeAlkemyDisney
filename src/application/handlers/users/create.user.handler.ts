import User from "../../../domain/entities/user.entity";
import userRepository from "../../../infraestructure/repositories/user.repository";
import emailService from "../../../infraestructure/services/email.service";
import CreateUserCommand from "../../commands/users/create.user.command";

export default new class CreateUserHandler {
    async execute(command: CreateUserCommand) {
        const user: User = User.create(
            command.getEmail(),
            command.getPassword()
        );

        const savedUser = userRepository.findOneByEmail(user.getEmail());
        if (await savedUser) {
            throw new Error("User already exists")
        };

        await userRepository.create(user);
        emailService.send(user.getEmail());
    }
}