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
var gameController_1 = require("./gameController");
// This is just an example second router to show how additional routers can be added
var GameRouter = /** @class */ (function (_super) {
    __extends(GameRouter, _super);
    function GameRouter() {
        return _super.call(this) || this;
    }
    // sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    GameRouter.prototype.setupRoutes = function () {
        this.expressRouter.get("/:id", GameRouter.projController.getGame);
        this.expressRouter.post("/", [securityMiddleware_1.SecurityMiddleware.RequireAuth], GameRouter.projController.addGame);
        this.expressRouter.put("/:id", [securityMiddleware_1.SecurityMiddleware.RequireAuth], GameRouter.projController.updateGame);
        //this.expressRouter.delete("/:id", [SecurityMiddleware.RequireAuth], GameRouter.projController.deleteGame);
    };
    GameRouter.projController = new gameController_1.GameController();
    return GameRouter;
}(AppRouter_1.AppRouter));
exports.GameRouter = GameRouter;
//# sourceMappingURL=gameRouter.js.map