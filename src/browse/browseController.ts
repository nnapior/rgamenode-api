import express, { RequestHandler } from "express";
import { Database } from "../common/MongoDB";
import { Config } from "../config";
import { GameController } from "../game/gameController";
// This is just an example of a second controller attached to the security module

export class BrowseController {

    // getGame
    // sends the specific game as JSON with id=:id
    public getAllGames(req: express.Request, res: express.Response) {
        //const id = Database.stringToId(req.params.id);
        GameController.db.getRecords(GameController.gamesTable, {})
            .then((results) => res.send({ fn: "getAllGames", status: "success", data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
}
