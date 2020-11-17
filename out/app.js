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
var NodeApplication_1 = require("./common/NodeApplication");
var mainRouter_1 = require("./mainRouter");
// main application class
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(port) {
        return _super.call(this, port, "/api") || this;
    }
    // Notify that server is running
    Application.prototype.OnSetupComplete = function (port) {
        console.log("ExampleApi Listening on port " + port.toString());
    };
    // setup main routing for the application
    Application.prototype.SetupRoutes = function () {
        return new mainRouter_1.MainRouter();
    };
    return Application;
}(NodeApplication_1.NodeApplication));
var port = process.env.PORT || 3000;
new Application(+port).startServer();
//# sourceMappingURL=app.js.map