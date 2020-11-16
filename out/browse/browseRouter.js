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
var browseController_1 = require("./browseController");
// This is just an example second router to show how additional routers can be added
var BrowseRouter = /** @class */ (function (_super) {
    __extends(BrowseRouter, _super);
    function BrowseRouter() {
        return _super.call(this) || this;
    }
    // sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    BrowseRouter.prototype.setupRoutes = function () {
        this.expressRouter.get("/all", BrowseRouter.projController.getAllGames);
    };
    BrowseRouter.projController = new browseController_1.BrowseController();
    return BrowseRouter;
}(AppRouter_1.AppRouter));
exports.BrowseRouter = BrowseRouter;
//# sourceMappingURL=browseRouter.js.map