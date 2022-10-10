import Session from "../../../domain/entities/session.entity";
import { Nullable } from "../../../domain/valueObjects/Nullable";
import sessionRepository from "../../../infraestructure/repositories/session.repository";
import CreateSessionCommand from "../../commands/sessions/create.session.command";

export default new class CreateSessionHandler {
    async execute(command: CreateSessionCommand) {

        const savedSession: Nullable<Session> = await sessionRepository.findOneByUserID(command.getUserID()); 

        if (savedSession) {
            return savedSession;
        };

        const session = Session.create(command.getUserID());
        return await sessionRepository.create(session)
    }
}