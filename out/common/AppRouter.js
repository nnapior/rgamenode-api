"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
/*AppRouter represents a route on the server.  AppRouters can be strung
        together to create a heirarchy */
var AppRouter = /** @class */ (function () {
    function AppRouter() {
        this.router = express_1.default.Router();
        this.setupRoutes();
    }
    Object.defineProperty(AppRouter.prototype, "expressRouter", {
        // expressRouter property accessor: Returns the underlying
        //      express router object
        get: function () {
            return this.router;
        },
        enumerable: true,
        configurable: true
    });
    // addRouter: Adds a child router on the given path beneath this router
    //   path: the path to reach the new router
    //   child: the child router object to be attached
    AppRouter.prototype.addRouter = function (path, child) {
        this.router.use(path, child.expressRouter);
    };
    return AppRouter;
}());
exports.AppRouter = AppRouter;
//# sourceMappingURL=AppRouter.js.map