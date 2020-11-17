"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AppRouter_1 = require("../common/AppRouter");
var securityMiddleware_1 = require("../security/securityMiddleware");
var projectsController_1 = require("./projectsController");
// This is just an example second router to show how additional routers can be added
var ProjectsRouter = /** @class */ (function (_super) {
    __extends(ProjectsRouter, _super);
    function ProjectsRouter() {
        return _super.call(this) || this;
    }
    // sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    ProjectsRouter.prototype.setupRoutes = function () {
        this.expressRouter.get("/semesters", ProjectsRouter.projController.getSemesters);
        this.expressRouter.get("/projectNumbers/:semester", ProjectsRouter.projController.getProjectNumbers);
        this.expressRouter.get("/:semester", ProjectsRouter.projController.getProjects);
        this.expressRouter.get("/:semester/:id", ProjectsRouter.projController.getProject);
        this.expressRouter.post("/", [securityMiddleware_1.SecurityMiddleware.RequireAuth], ProjectsRouter.projController.addProject);
        this.expressRouter.put("/:id", [securityMiddleware_1.SecurityMiddleware.RequireAuth], ProjectsRouter.projController.updateProject);
        this.expressRouter.delete("/:id", [securityMiddleware_1.SecurityMiddleware.RequireAuth], ProjectsRouter.projController.deleteProject);
    };
    ProjectsRouter.projController = new projectsController_1.ProjectsController();
    return ProjectsRouter;
}(AppRouter_1.AppRouter));
exports.ProjectsRouter = ProjectsRouter;
//# sourceMappingURL=projectsRouter.js.map