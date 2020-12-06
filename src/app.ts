import express from "express";
import { AppRouter } from "./common/AppRouter";
import { NodeApplication } from "./common/NodeApplication";
import { MainRouter } from "./mainRouter";

// main application class
class Application extends NodeApplication {

	constructor(port: number) {
		super(port, "/api");
	}

	// Notify that server is running
	public OnSetupComplete(port: number): void {
		console.log("ExampleApi Listening on port " + port.toString());
	}

	// setup main routing for the application
	public SetupRoutes(): AppRouter {
		return new MainRouter();
	}
}
const port = process.env.PORT || 3000;
new Application(+port).startServer();
