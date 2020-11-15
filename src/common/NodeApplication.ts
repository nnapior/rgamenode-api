import bodyParser from "body-parser";
import express from "express";
import { AppRouter } from "./AppRouter";

/* This is the base class for a Node Express application, it provides lifecycle hooks
    for various stages of application initialization and an abstract method
    for attaching the endpoint routes to the appliation */
export abstract class NodeApplication {

    public app: express.Application;
    public routes: express.Router;

    // NodeApplication:
    //  port: number - The port for the node server to listen on
    //  rootPath: string (Optional) - The path of the root route,
    //             defaults to the root of the server
    constructor(private port: number, rootPath: string= "/") {
        this.app = express();
        this.OnBeforeInit();
        this.initCors();
        this.initBodyParser();
        this.routes = this.SetupRoutes().expressRouter;
        this.app.use(rootPath, this.routes);
    }

    // SetupRoutes: Abstract method for child classes to implement
    //   returns: A populated AppRouter object to be attached to the
    //      root of the site
    public abstract SetupRoutes(): AppRouter;

    // OnBeforeInit: Lifecycle hook before initialization of the application
    public OnBeforeInit(): void {}    // OnSetupComplete: Lifecycle hook after node server started and listening
    public OnSetupComplete(port: number): void {}

    // startServer: Called to start the node.js server
    public startServer(): void {
        this.app.listen(this.port, () => this.OnSetupComplete(this.port));
    }

    // initBodyParser: Initialize default options for the body parser
    //  override to prevent or change behavior
    protected initBodyParser(): void {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    // initCors: Initialize default options for CORS allowing open access
    //      Override this method to prvent or change behavior
    protected initCors(): void {
        this.app.use(function(req: express.Request, res: express.Response, next: any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }
}
