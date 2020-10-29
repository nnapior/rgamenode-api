import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { ProjectsController } from "./projectsController";

// This is just an example second router to show how additional routers can be added
export class ProjectsRouter extends AppRouter {
    public static projController: ProjectsController = new ProjectsController();
    constructor() {super(); }

    // sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    public setupRoutes(): void {
        this.expressRouter.get("/semesters", ProjectsRouter.projController.getSemesters);
        this.expressRouter.get("/projectNumbers/:semester", ProjectsRouter.projController.getProjectNumbers);
        this.expressRouter.get("/:semester", ProjectsRouter.projController.getProjects);
        this.expressRouter.get("/:semester/:id", ProjectsRouter.projController.getProject);
        this.expressRouter.post("/", [SecurityMiddleware.RequireAuth], ProjectsRouter.projController.addProject);
        this.expressRouter.put("/:id", [SecurityMiddleware.RequireAuth], ProjectsRouter.projController.updateProject);
        this.expressRouter.delete("/:id", [SecurityMiddleware.RequireAuth], ProjectsRouter.projController.deleteProject);
    }
}
