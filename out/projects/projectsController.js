"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDB_1 = require("../common/MongoDB");
var config_1 = require("../config");
var projectsModel_1 = require("./projectsModel");
// This is just an example of a second controller attached to the security module
var ProjectsController = /** @class */ (function () {
    function ProjectsController() {
    }
    // getProjects
    // sends a json object with all projects in the system that match :year
    ProjectsController.prototype.getProjects = function (req, res) {
        var semester = req.params.semester;
        ProjectsController.db.getRecords(ProjectsController.projectsTable, { semester: semester })
            .then(function (results) { return res.send({ fn: "getProjects", status: "success", data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    // getProject
    // sends the specific project as JSON with id=:id
    ProjectsController.prototype.getProject = function (req, res) {
        var semester = req.params.semester;
        var id = MongoDB_1.Database.stringToId(req.params.id);
        ProjectsController.db.getOneRecord(ProjectsController.projectsTable, { _id: id, semester: semester })
            .then(function (results) { return res.send({ fn: "getProject", status: "success", data: results }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    // addProject
    // adds the project to the database
    ProjectsController.prototype.addProject = function (req, res) {
        var proj = projectsModel_1.ProjectsModel.fromObject(req.body);
        ProjectsController.db.addRecord(ProjectsController.projectsTable, proj.toObject())
            .then(function (result) { return res.send({ fn: "addProject", status: "success" }).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    // updateProject
    // updates the project in the database with id :id
    ProjectsController.prototype.updateProject = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        var data = req.body;
        delete data.authUser;
        ProjectsController.db.updateRecord(ProjectsController.projectsTable, { _id: id }, { $set: req.body })
            .then(function (results) { return results ? (res.send({ fn: "updateProject", status: "success" })) : (res.send({ fn: "updateProject", status: "failure", data: "Not found" })).end(); })
            .catch(function (err) { return res.send({ fn: "updateProject", status: "failure", data: err }).end(); });
    };
    // deleteProject
    // deletes the project int he database with id :id
    ProjectsController.prototype.deleteProject = function (req, res) {
        var id = MongoDB_1.Database.stringToId(req.params.id);
        ProjectsController.db.deleteRecord(ProjectsController.projectsTable, { _id: id })
            .then(function (results) { return results ? (res.send({ fn: "deleteProject", status: "success" })) : (res.send({ fn: "deleteProject", status: "failure", data: "Not found" })).end(); })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    // getSemesters
    // returns all valid unique semesters in the database
    ProjectsController.prototype.getSemesters = function (req, res) {
        ProjectsController.db.getRecords(ProjectsController.projectsTable)
            .then(function (results) {
            // extracts just the semester
            var semesters = results.map(function (x) { return x.semester; });
            // removes duplciates
            semesters = semesters.filter(function (value, index, array) {
                return !array.filter(function (v, i) { return value === v && i < index; }).length;
            });
            res.send({ fn: "deleteProject", status: "success", data: { semesters: semesters } });
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    // getProjectNumbers
    // returns all valid unique projectNumbers for a given semesters in the database
    ProjectsController.prototype.getProjectNumbers = function (req, res) {
        var semester = req.params.semester;
        ProjectsController.db.getRecords(ProjectsController.projectsTable, { semester: semester })
            .then(function (results) {
            // extracts just the projectNumber
            var projects = results.map(function (x) { return x.projectNumber; });
            // removes duplciates
            projects = projects.filter(function (value, index, array) {
                return !array.filter(function (v, i) { return value === v && i < index; }).length;
            });
            res.send({ fn: "deleteProject", status: "success", data: { projectNumbers: projects.sort() } });
        })
            .catch(function (reason) { return res.status(500).send(reason).end(); });
    };
    ProjectsController.db = new MongoDB_1.Database(config_1.Config.url, "projects");
    ProjectsController.projectsTable = "projects";
    return ProjectsController;
}());
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projectsController.js.map