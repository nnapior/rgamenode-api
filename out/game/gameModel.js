"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModel = /** @class */ (function () {
    function GameModel() {
        this.gameID = "";
        this.name = "";
        this.creator = "";
        this.owner = "";
        this.description = "";
    }
    GameModel.fromObject = function (object) {
        var p = new GameModel();
        p.name = object.name;
        p.creator = object.creator;
        p.owner = object.owner;
        return p;
    };
    GameModel.prototype.toObject = function () {
        return {
            name: this.name,
            creator: this.creator,
            owner: this.owner,
        };
    };
    return GameModel;
}());
exports.GameModel = GameModel;
//# sourceMappingURL=gameModel.js.map