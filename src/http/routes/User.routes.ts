import { Application } from "express";
import createUserAction from "../actions/users/create.user.action";
import loginUserAction from "../actions/users/login.user.action";
import CommonRoutes from "./Common.routes";

export default class UserRoutes extends CommonRoutes{
    constructor(
        app: Application,
    ) {
        super(app, "User");
    };

    setUpRoutes(): Application {
        
        this.app.get("/auth/login", loginUserAction.run);
        
        this.app.post("/auth/register", createUserAction.run);

        return this.app;
    }
}