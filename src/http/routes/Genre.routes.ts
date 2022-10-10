import express, { Application } from "express";
import CommonRoutes from "./Common.routes";
import multer from 'multer';
import createGenreAction from "../actions/genres/create.genre.action";
import listGenreAction from "../actions/genres/list.genre.action";

const upload = multer({ storage: multer.memoryStorage() });

export default class GenreRoutes extends CommonRoutes{
    
    constructor(
        app: Application,
    ) {
        super(app, "Character");
    };

    setUpRoutes(): Application {
        
        this.app.use("/genres/images", express.static("public/assets/genres/"));

        this.app.get("/genres", listGenreAction.run);
        
        this.app.post("/genre", upload.single('image'), createGenreAction.run);

        return this.app;
    }
}