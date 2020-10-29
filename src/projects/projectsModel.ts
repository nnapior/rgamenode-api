
export class ProjectsModel {

    public static fromObject(object: any): ProjectsModel {
        const p: ProjectsModel = new ProjectsModel();
        p.name = object.name;
        p.description = object.description;
        p.groupid = object.groupId;
        p.groupMembers = object.groupMembers;
        p.semester = object.semester;
        p.projectNumber = object.projectNumber;
        return p;
    }
    public id = "";
    public name = "";
    public description ?= "";
    public groupid = "";
    public groupMembers: string[] = [];
    public semester = "";
    public projectNumber = 0;
    public toObject(): any {
        return {name: this.name, description: this.description, groupid: this.groupid, groupMembers: this.groupMembers, semester: this.semester, projectNumber: this.projectNumber};
    }
}
