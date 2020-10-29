"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
/* This is the base class for a Node Express application, it provides lifecycle hooks
    for various stages of application initialization and an abstract method
    for attaching the endpoint routes to the appliation */
var NodeApplication = /** @class */ (function () {
    // NodeApplication:
    //  port: number - The port for the node server to listen on
    //  rootPath: string (Optional) - The path of the root route,
    //             defaults to the root of the server
    function NodeApplication(port, rootPath) {
        if (rootPath === void 0) { rootPath = "/"; }
        this.port = port;
        this.app = express_1.default();
        this.OnBeforeInit();
        this.initCors();
        this.initBodyParser();
        this.routes = this.SetupRoutes().expressRouter;
        this.app.use(rootPath, this.routes);
    }
    // OnBeforeInit: Lifecycle hook before initialization of the application
    NodeApplication.prototype.OnBeforeInit = function () { }; // OnSetupComplete: Lifecycle hook after node server started and listening
    NodeApplication.prototype.OnSetupComplete = function (port) { };
    // startServer: Called to start the node.js server
    NodeApplication.prototype.startServer = function () {
        var _this = this;
        this.app.listen(this.port, function () { return _this.OnSetupComplete(_this.port); });
    };
    // initBodyParser: Initialize default options for the body parser
    //  override to prevent or change behavior
    NodeApplication.prototype.initBodyParser = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
    };
    // initCors: Initialize default options for CORS allowing open access
    //      Override this method to prvent or change behavior
    NodeApplication.prototype.initCors = function () {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    };
    return NodeApplication;
}());
exports.NodeApplication = NodeApplication;
//# sourceMappingURL=NodeApplication.js.map