import express, { RequestHandler } from "express";
import { Database } from "../common/MongoDB";
import { Config } from "../config";
import { GameModel } from "./gameModel";
import fs from "fs";
import unzipper from "unzipper";
// Yup, it's time

export class GameController {
	public static db: Database = new Database(Config.url, "games");
	public static gamesTable = "games";

	// getGame
	// sends the specific game as JSON with id=:id
	public getGame(req: express.Request, res: express.Response) {
		const id = Database.stringToId(req.params.id);
		GameController.db.getOneRecord(GameController.gamesTable, { _id: id})
			.then((results) => {
				if (results) {
					res.send({ fn: "getGame", status: "success", data: results }).end();
				} else {
					res.send({ fn: "getPublic", status: "failure", data: "No user found" }).end();
				}
			})
			.catch((reason) => res.status(500).send(reason).end());
	}
	// addGame
	// adds the game to the database
	public addGame(req: express.Request, res: express.Response) {
		const proj: GameModel = new GameModel();
		console.log(req.body);
		proj.name = req.body.name || "Untitled";
		proj.description = req.body.description;
		proj.creator = req.body.authUser._id;
		proj.owner = req.body.authUser._id;
		proj.credits = [{
			id : req.body.authUser._id,
			//username : req.body.authUser.username,
			credit : "creator"
		}];
		GameController.db.addRecord(GameController.gamesTable, proj.toObject())
			.then((result: any) => {
				//console.log(result);
				res.send({ fn: "addGame", status: "success", data: result}).end()
			})
			.catch((reason) => res.status(500).send(reason).end());
	}

	// updateGame
	// updates the game in the database with id :id
	public updateGame(req: express.Request, res: express.Response) {
		const id = Database.stringToId(req.params.id);
		const data = req.body;
		const owner = data.authUser._id;
		const changing:any = {};
		if (data.name) {
			changing.name = data.name;
		}
		if (data.tags) {
			changing.tags = data.tags;
		}
		if (data.description) {
			changing.description = data.description;
		}
		GameController.db.updateRecord(GameController.gamesTable, { _id: id , owner: owner}, { $set: changing })
			.then((results) => results ? (res.send({ fn: "updateGame", status: "success" })) : (res.send({ fn: "updateGame", status: "failure", data: "Not found or not owned" })).end())
			.catch((err) => res.send({ fn: "updateGame", status: "failure", data: err }).end());

	}
	// deleteGame
	// deletes the game in the database with id :id
	public deleteGame(req: express.Request, res: express.Response) {
		const id = Database.stringToId(req.params.id);
		GameController.db.deleteRecord(GameController.gamesTable, { _id: id })
			.then((results) => results ? (res.send({ fn: "deleteGame", status: "success" })) : (res.send({ fn: "deleteGame", status: "failure", data: "Not found" })).end())
			.catch((reason) => res.status(500).send(reason).end());
	}

	public uploadFiles(req: express.Request, res: express.Response) {
		const gameID = req.params.id;
		fs.createReadStream("uploads/"+gameID+".zip")
		.pipe(unzipper.Extract({ path: "gamefiles/"+gameID }));
		res.send({ fn: "uploadFiles", status: "we're trying to unzip now" });
    }
    
    public uploadThumb(req: express.Request, res: express.Response) {
		const gameID = Database.stringToId(req.params.id);
        const ending : string = req.file.originalname.substr(req.file.originalname.lastIndexOf("."));
		GameController.db.updateRecord(GameController.gamesTable, { _id: gameID}, { $set: {thumbname: gameID + ending} })
			.then((results) => results ? (res.send({ fn: "uploadThumb", status: "success" })) : (res.send({ fn: "uploadThumb", status: "failure", data: "Not found or not owned" })).end())
			.catch((err) => res.send({ fn: "uploadThumb", status: "failure", data: err }).end());
	}
}
