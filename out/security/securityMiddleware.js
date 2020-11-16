"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
// Class represeneting verification function for JWT.  The static member can be used to return a method that validates the token
var SecurityMiddleware = /** @class */ (function () {
    function SecurityMiddleware() {
    }
    Object.defineProperty(SecurityMiddleware, "RequireAuth", {
        // Returns a method that validates a bearer token, on success, populates authUser in the body with the user information from the token,
        // then calls the next function in the chain (the controller).  On failure to authenticate, halts execution and sends error response
        get: function () {
            return function (req, res, next) {
                var token = req.headers["x-access-token"] || req.headers.authorization;
                // if no token found, return response (without going to the next middelware)
                if (!token) {
                    return res.status(401).send("Access denied. No token provided.");
                }
                if (token.includes("bearer")) {
                    token = token.toString().substr(6).trimLeft();
                }
                try {
                    // if can verify the token, set req.user and pass to next middleware
                    var decoded = jsonwebtoken_1.default.verify(token.toString(), config_1.Config.secret);
                    console.log(decoded);
                    req.body.authUser = decoded;
                    next();
                }
                catch (ex) {
                    // if invalid token
                    res.status(400).send("Invalid token.");
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return SecurityMiddleware;
}());
exports.SecurityMiddleware = SecurityMiddleware;
//# sourceMappingURL=securityMiddleware.js.map