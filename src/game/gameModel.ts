
export class GameModel {

    public static fromObject(object: any): GameModel {
		const p: GameModel = new GameModel();
		p.name = object.name;
		p.creator = object.creator;
        p.owner = object.owner;
        return p;
    }
    public gameID = "";
	public name = "";
	public creator = "";
	public owner = "";
    public description ?= "";
    public toObject(): any {
        return {
			name: this.name,
			creator : this.creator,
			owner: this.owner,
		};
    }
}
