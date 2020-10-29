import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";

// Class represeneting verification function for JWT.  The static member can be used to return a method that validates the token

export class SecurityMiddleware {

    // Returns a method that validates a bearer token, on success, populates authUser in the body with the user information from the token,
    // then calls the next function in the chain (the controller).  On failure to authenticate, halts execution and sends error response
    static get RequireAuth(): RequestHandler {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let token = req.headers["x-access-token"] || req.headers.authorization;
            // if no token found, return response (without going to the next middelware)
            if (!token) { return res.status(401).send("Access denied. No token provided."); }

            if (token.includes("bearer")) { token = token.toString().substr(6).trimLeft(); }
            try {
                // if can verify the token, set req.user and pass to next middleware
                const decoded = jwt.verify(token.toString(), Config.secret);
                req.body.authUser = decoded;
                next();
            } catch (ex) {
                // if invalid token
                res.status(400).send("Invalid token.");
            }
        };
    }
}
