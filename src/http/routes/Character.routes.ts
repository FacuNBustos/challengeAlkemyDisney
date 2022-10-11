import express, { Application } from "express";
import CommonRoutes from "./Common.routes";
import multer from "multer";
import createCharacterAction from "../actions/characters/create.character.action";
import deleteCharacterAction from "../actions/characters/delete.character.action";
import findOneByIdCharacterAction from "../actions/characters/findOneById.character.action";
import listCharacterAction from "../actions/characters/list.character.action";
import updateCharacterAction from "../actions/characters/update.character.action";

const upload = multer({ storage: multer.memoryStorage() });

export default class CharacterRoutes extends CommonRoutes{
    constructor(
        app: Application,
    ) {
        super(app, "Character");
    };

    setUpRoutes(): Application {
        
        this.app.use("/characters/images", express.static("public/assets/characters/"));

        this.app.get("/characters", listCharacterAction.run);

        this.app.get("/characters/:id", findOneByIdCharacterAction.run);

        this.app.post("/characters", upload.single('image'), createCharacterAction.run);

        this.app.put("/characters/:id", upload.single('image'), updateCharacterAction.run);

        this.app.delete("/characters/:id", deleteCharacterAction.run);

        return this.app;
    }
}