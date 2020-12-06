import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { BrowseController } from "./browseController";

// This is just an example second router to show how additional routers can be added
export class BrowseRouter extends AppRouter {
	public static browseController: BrowseController = new BrowseController();
	constructor() {super(); }

	// sets up the routes within this module shows an example of a route that requires authorization, and one that does not
	public setupRoutes(): void {
	  this.expressRouter.get("/all", BrowseRouter.browseController.getAllGames);
	  this.expressRouter.get("/advance", BrowseRouter.browseController.advanceSearch); 
	}
}
