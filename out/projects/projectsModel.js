"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectsModel = /** @class */ (function () {
    function ProjectsModel() {
        this.id = "";
        this.name = "";
        this.description = "";
        this.groupid = "";
        this.groupMembers = [];
        this.semester = "";
        this.projectNumber = 0;
    }
    ProjectsModel.fromObject = function (object) {
        var p = new ProjectsModel();
        p.name = object.name;
        p.description = object.description;
        p.groupid = object.groupId;
        p.groupMembers = object.groupMembers;
        p.semester = object.semester;
        p.projectNumber = object.projectNumber;
        return p;
    };
    ProjectsModel.prototype.toObject = function () {
        return { name: this.name, description: this.description, groupid: this.groupid, groupMembers: this.groupMembers, semester: this.semester, projectNumber: this.projectNumber };
    };
    return ProjectsModel;
}());
exports.ProjectsModel = ProjectsModel;
//# sourceMappingURL=projectsModel.js.map