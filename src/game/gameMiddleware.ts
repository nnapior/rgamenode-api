import express, { RequestHandler } from "express";
import { Database } from "../common/MongoDB";
import { Config } from "../config";
import { GameController } from "./gameController";

// Class represeneting verification function for JWT.  The static member can be used to return a method that validates the token

export class GameMiddleware {

    // Returns a method that validates a bearer token, on success, populates authUser in the body with the user information from the token,
    // then calls the next function in the chain (the controller).  On failure to authenticate, halts execution and sends error response
    static get GameAuth(): RequestHandler {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
			var gameID = Database.stringToId(req.params.id);
			//console.log(gameID);
			//console.log(GameController.gamesTable);
			var rec = GameController.db.getOneRecord(GameController.gamesTable, { _id: gameID })
				.then((results) => {
					if (!results) {
						res.send({ fn: "GameAuth", status: "failure", data: "Game not found." }).end();
					} else if (results.owner == req.body.userID) {
						//req.body.gameData = results;
						//res.send({ fn: "GameAuth", status: "success" });
						next();
					} else {
						res.send({ fn: "GameAuth", status: "failure", data: "User does not own game." }).end();
					}
				})
				.catch((err) => res.send({ fn: "GameAuth", status: "failure", data: err }).end());
		};
    }
}
