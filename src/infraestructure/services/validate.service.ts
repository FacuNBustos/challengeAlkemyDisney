import validate from "uuid-validate";
import { Undefinable } from "../../domain/valueObjects/Undefinable";
import sessionRepository from "../repositories/session.repository";

export default new class ValidateService {
    
    email(email: string): Boolean{
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return email.match(regex)? true : false;
    };

    fullname(fullname: string): boolean {
        const regex = /^[a-z ,.'-]+$/i;
        return fullname.match(regex)? true : false;
    };

    number(number: string): boolean {
        const regex = /^[1-9]\d*$/;
        return number.match(regex)? true : false
    };

    async sessionToken(token: Undefinable<string>): Promise<void> {
        
        if (!token || !validate(token)) throw new Error("invalid token");

        const tokenSaved = await sessionRepository.findOneByToken(token);
        
        if (!tokenSaved) throw new Error("Nonexistent token");
    };
    
}