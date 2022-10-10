import characterRepository from "../../../infraestructure/repositories/character.repository";
import configuration from '../../../../config';

export default new class ListCharacterHandler {
    async execute(): Promise<any[]> {

        const charactersSaved = await characterRepository.findAll();

        if (charactersSaved) {
            return charactersSaved.map((elem) => {
                return elem.toPrimitives()
            }).map((elem:any) => {
                return { id:elem.id ,name: elem.name, image: `${configuration.getHost()}/characters/images/${elem.image}`}
            })
        };

        throw new Error("Missing characters");
    }
}