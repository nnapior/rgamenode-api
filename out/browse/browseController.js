"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameController_1 = require("../game/gameController");
// This is just an example of a second controller attached to the security module
var BrowseController = /** @class */ (function () {
    function BrowseController() {
    }
    // getGame
    // sends the specific game as JSON with id=:id
    BrowseController.prototype.getAllGames = function (req, res) {
        //const id = Database.stringToId(req.params.id);
        gameController_1.GameController.db.getRecords(gameController_1.GameController.gamesTable, {})
            .then(function (results) { return res.send({ fn: "getAllGames", status: "success", data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    return BrowseController;
}());
exports.BrowseController = BrowseController;
//# sourceMappingURL=browseController.js.map