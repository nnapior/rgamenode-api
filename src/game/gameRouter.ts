import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { GameController } from "./gameController";
import { GameMiddleware } from "./gameMiddleware";
import cors from "cors";
import multer from "multer";

// This is just an example second router to show how additional routers can be added
export class GameRouter extends AppRouter {
	public static projController: GameController = new GameController();
	public static gameStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, "uploads");
		},
		filename: (req, file, cb) => {
			cb(null, req.params.id+".zip");
		}
	});
	public static gameUploads = multer({storage: GameRouter.gameStorage});
    constructor() {super(); }

    // sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    public setupRoutes(): void {
		this.expressRouter.get("/:id", GameRouter.projController.getGame);
        this.expressRouter.post("/", [SecurityMiddleware.RequireAuth], GameRouter.projController.addGame);
        this.expressRouter.put("/:id", [SecurityMiddleware.RequireAuth], GameRouter.projController.updateGame);
        //this.expressRouter.delete("/:id", [SecurityMiddleware.RequireAuth], GameRouter.projController.deleteGame);
        this.expressRouter.put("/:id/upload", SecurityMiddleware.RequireAuth, GameMiddleware.GameAuth, /*cors(), */GameRouter.gameUploads.single("file"), GameRouter.projController.uploadFiles);
    }
}
