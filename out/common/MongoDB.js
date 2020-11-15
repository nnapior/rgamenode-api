"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
/*Wrapper class for accessing Mongo Databse*/
var Database = /** @class */ (function () {
    // constructor
    // url: the connection url for the mongo server
    // dbName: the name of the database to access
    function Database(url, dbName) {
        this.url = url;
        this.dbName = dbName;
    }
    // converts a string to a mongodb object id
    Database.stringToId = function (id) {
        return new mongodb_1.ObjectID(id);
    };
    // addRecord
    // collection: the name of the collection to add the record to.
    // object: a javascript object to store in the collection
    // returns a promise to an array of records
    Database.prototype.addRecord = function (collection, object) {
        var dbname = this.dbName;
        var url = this.url;
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                var dbo = db.db(dbname);
                dbo.collection(collection).insertOne(object, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    db.close();
                    resolve(true);
                });
            });
        });
    };
    // updateRecord
    // collection: the name of the collection to update the record to.
    // object: a javascript object to store in the collection
    // returns a promise to a boolean indicating success
    Database.prototype.updateRecord = function (collection, filter, update) {
        var dbname = this.dbName;
        var url = this.url;
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                var dbo = db.db(dbname);
                dbo.collection(collection).updateOne(filter, update, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    db.close();
                    resolve(result.matchedCount == 1);
                });
            });
        });
    };
    // getRecords
    // collection: the name of the collection to get from.
    // query: a mongo query object
    // returns a promise to an array of records
    Database.prototype.getRecords = function (collection, query) {
        if (query === void 0) { query = {}; }
        var dbname = this.dbName;
        var url = this.url;
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                var dbo = db.db(dbname);
                dbo.collection(collection).find(query).toArray(function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                });
            });
        });
    };
    // getOneRecords
    // collection: the name of the collection to get from.
    // query: a mongo query object
    // returns a promise to a single records
    Database.prototype.getOneRecord = function (collection, query) {
        if (query === void 0) { query = {}; }
        var dbname = this.dbName;
        var url = this.url;
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                var dbo = db.db(dbname);
                dbo.collection(collection).findOne(query, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    db.close();
                    resolve(result);
                });
            });
        });
    };
    // deleteRecord
    // collection: the name of the collection to get from.
    // query: a mongo query object
    // returns a promise to a boolean indicating success
    Database.prototype.deleteRecord = function (collection, query) {
        if (query === void 0) { query = {}; }
        var dbname = this.dbName;
        var url = this.url;
        return new Promise(function (resolve, reject) {
            mongodb_1.MongoClient.connect(url, function (err, db) {
                if (err) {
                    reject(err);
                }
                var dbo = db.db(dbname);
                dbo.collection(collection).deleteOne(query, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    db.close();
                    resolve(result.deletedCount == 1);
                });
            });
        });
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=MongoDB.js.map