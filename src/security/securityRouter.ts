import { AppRouter } from "../common/AppRouter";
import { SecurityController } from "./securityController";
import { SecurityMiddleware } from "./securityMiddleware";

// Router for security portion of the api
export class SecurityRouter extends AppRouter {

    constructor() {super(); }

    // called by the framework to add the routes for the security portion of the API
    public setupRoutes(): void {
        const securityController: SecurityController = new SecurityController();
        this.expressRouter.get("/authorize", [SecurityMiddleware.RequireAuth], securityController.authorize);
        this.expressRouter.post("/login", securityController.login);
        this.expressRouter.post("/register", securityController.register);
        //this.expressRouter.post("/changepwd", [SecurityMiddleware.RequireAuth], securityController.changePwd);
        this.expressRouter.get("/public/:id", securityController.getPublic);
    }
}
