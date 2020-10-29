import express from "express";

/*AppRouter represents a route on the server.  AppRouters can be strung
        together to create a heirarchy */
export abstract class AppRouter {
    protected router: express.Router;

    // expressRouter property accessor: Returns the underlying
    //      express router object
    public get expressRouter(): express.Router {
        return this.router;
    }
    constructor() {
        this.router = express.Router();
        this.setupRoutes();
    }

    // addRouter: Adds a child router on the given path beneath this router
    //   path: the path to reach the new router
    //   child: the child router object to be attached
    public addRouter(path: string, child: AppRouter): void {
        this.router.use(path, child.expressRouter);
    }

    // setupRoutes: abstract method to be implemented in child classes to
    //      create the underlying routes that are part of this route tree
    public abstract setupRoutes(): void;
}
