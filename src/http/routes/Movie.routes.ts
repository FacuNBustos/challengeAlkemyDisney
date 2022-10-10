import express, { Application } from "express";
import multer from "multer";
import createMovieAction from "../actions/movies/create.movie.action";
import deleteMovieAction from "../actions/movies/delete.movie.action";
import findOneByIdMovieAction from "../actions/movies/findOneById.movie.action";
import listMovieAction from "../actions/movies/list.movie.action";
import updateMovieAction from "../actions/movies/update.movie.action";
import CommonRoutes from "./Common.routes";

const upload = multer({ storage: multer.memoryStorage() });

export default class MovieRoutes extends CommonRoutes{
    constructor(
        app: Application,
    ) {
        super(app, "Movies");
    };

    setUpRoutes(): Application {
        
        this.app.use("/movies/images", express.static("public/assets/movies/"));

        this.app.get("/movies", listMovieAction.run);

        this.app.get("/movies/:id", findOneByIdMovieAction.run);
        
        this.app.post("/movies", upload.single('image'),createMovieAction.run);

        this.app.put("/movies/:id", upload.single('image'), updateMovieAction.run);

        this.app.delete("/movies/:id", deleteMovieAction.run);

        return this.app;
    }
}