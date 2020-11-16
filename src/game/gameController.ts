import express, { RequestHandler } from "express";
import { Database } from "../common/MongoDB";
import { Config } from "../config";
import { GameModel } from "./gameModel";
// This is just an example of a second controller attached to the security module

export class GameController {
    public static db: Database = new Database(Config.url, "games");
    public static gamesTable = "games";

    // getGame
    // sends the specific game as JSON with id=:id
    public getGame(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        GameController.db.getOneRecord(GameController.gamesTable, { _id: id})
            .then((results) => res.send({ fn: "getGame", status: "success", data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
    // addGame
    // adds the game to the database
    public addGame(req: express.Request, res: express.Response) {
		const proj: GameModel = new GameModel();
		proj.name = req.body.name || "Untitled";
		proj.owner = req.body.authUser.userID;

        GameController.db.addRecord(GameController.gamesTable, proj.toObject())
            .then((result: boolean) => res.send({ fn: "addGame", status: "success" }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    // updateGame
    // updates the game in the database with id :id
    public updateGame(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
		const data = req.body;
		const owner = data.authUser.userID;
        delete data.authUser;
        GameController.db.updateRecord(GameController.gamesTable, { _id: id , owner: owner}, { $set: req.body })
            .then((results) => results ? (res.send({ fn: "updateGame", status: "success" })) : (res.send({ fn: "updateGame", status: "failure", data: "Not found" })).end())
            .catch((err) => res.send({ fn: "updateGame", status: "failure", data: err }).end());

    }
    // deleteGame
    // deletes the game int he database with id :id
    public deleteGame(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        GameController.db.deleteRecord(GameController.gamesTable, { _id: id })
            .then((results) => results ? (res.send({ fn: "deleteGame", status: "success" })) : (res.send({ fn: "deleteGame", status: "failure", data: "Not found" })).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
}
