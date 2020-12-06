import express from "express";
import { AppRouter } from "./common/AppRouter";
import { SecurityRouter } from "./security/securityRouter";
import { GameRouter } from "./game/gameRouter";
import { BrowseRouter } from "./browse/browseRouter";

// root router for the API

export class MainRouter extends AppRouter {
	constructor() {super(); }

	// adds the child routers to various paths to form the overall API.
	public setupRoutes(): void {
		this.addRouter("/security", new SecurityRouter());
		this.addRouter("/game", new GameRouter());
		this.addRouter("/browse", new BrowseRouter());
	}

}
