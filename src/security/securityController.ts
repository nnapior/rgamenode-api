import express from "express";
import jwt from "jsonwebtoken";
import { Database } from "../common/MongoDB";
import { Config } from "../config";
import { UserModel } from "./userModel";
import { v4 as uuidv4 } from 'uuid';

// Implementation of security endpoints

export class SecurityController {
    public static db: Database = new Database(Config.url, "security");
    public static usersTable = "users";

    // login - POST
    // expects email and password fields to be set in the body of the post request
    // sends a token to the caller on success, 401 on failure
    public login(req: express.Request, res: express.Response, next: express.NextFunction) {
        SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
            .then((userRecord: any) => {
                if (!userRecord) { return res.sendStatus(401).end(); }
                const usr: UserModel = UserModel.fromObject(userRecord);
                if (!usr.validatePassword(req.body.password)) { return res.sendStatus(401).end(); }
                const token = jwt.sign(usr.toObject(), Config.secret, { expiresIn: Config.tokenLife });
                res.send({ fn: "login", status: "success", data: { token, userID: userRecord._id } }).end();
            }).catch((err) => res.sendStatus(500).end());
    }

    // register - POST
    // expects email and password fields to be set in the body of the post request
    // sends a success message to caller on success, or a failure status code on failure
    public register(req: express.Request, res: express.Response, next: express.NextFunction) {
		/*var miscError:String = "";
		if (!req.body.email || !req.body.username || !req.body.password) {
			
		} else if (!req.body.includes("@")) {

		}
		if (miscError.length > 1) {
			return res.status(400).send({ fn: "register", status: "failure", data: miscError }).end()
		}*/
		const user: UserModel = new UserModel(req.body.email, req.body.username, req.body.password);
        SecurityController.db.getOneRecord(SecurityController.usersTable, { email: req.body.email })
            .then((userRecord: any) => {
                if (userRecord) { return res.status(400).send({ fn: "register", status: "failure", data: "User already exists" }).end(); }
                SecurityController.db.addRecord(SecurityController.usersTable, user.toObject()).then((result: boolean) => res.send({ fn: "register", status: "success" }).end())
                    .catch((reason) => res.sendStatus(500).end());
            }).catch((reason) => res.sendStatus(500).end());
    }
    // authorize - GET
    // this code actually does nothing, but if it is secured at the route level, it will return the email address for the token that
    // was returned.  This is used to verify a token by a client application
    // returns the users userID on success
    public authorize(req: express.Request, res: express.Response, next: express.NextFunction) {
        // validate that req.authUser exists, if so, return the user's userID address.
        console.log();
        res.send({ fn: "authorize", status: "success", data: {userID: req.body.authUser.userID} }).end();
    }
    /*
    // changePwd - POST
    // changes the password of the user represented in the token.  Expects password in the body of the POST
    // returns a success messager to the client on success, a failure status code on failure
    public changePwd(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.body.password) { res.status(400).send({ fn: "changePwd", status: "failure" }).end(); }
        const user: UserModel = new UserModel(this.userID, req.body.authUser.userID, req.body.password);
        SecurityController.db.updateRecord(SecurityController.usersTable, {userID: user.userID}, { $set: {password: user.password }}).then((result: Boolean) => {
            if (result) {
                res.send({ fn: "changePwd", status: "success" }).end();
            } else {
                res.status(400).send({ fn: "changePwd", status: "failure" }).end();
            }
        }).catch((err) => res.send({ fn: "changePwd", status: "failure", data: err }).end());
    }
    */
    public static generateUniqueID() : string {
        
        return uuidv4();
    }
}
