import { FilterQuery, MongoClient, ObjectID } from "mongodb";
/*Wrapper class for accessing Mongo Databse*/

export class Database {

    // converts a string to a mongodb object id
    public static stringToId(id: string): ObjectID {
        return new ObjectID(id);
    }

    // constructor
    // url: the connection url for the mongo server
    // dbName: the name of the database to access
    constructor(private url: string, private dbName: string) { }
    // addRecord
    // collection: the name of the collection to add the record to.
    // object: a javascript object to store in the collection
    // returns a promise to an array of records
    public addRecord(collection: string, object: any): Promise<boolean> {
        const dbname = this.dbName;
        const url = this.url;
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) { reject(err); }
                const dbo = db.db(dbname);
                dbo.collection(collection).insertOne(object, (err, result) => {
                    if (err) { reject(err); }
                    db.close();
                    resolve(true);
                });
            });

        });
    }

    // updateRecord
    // collection: the name of the collection to update the record to.
    // object: a javascript object to store in the collection
    // returns a promise to a boolean indicating success
    public updateRecord(collection: string, filter: any, update: any): Promise<boolean> {
        const dbname = this.dbName;
        const url = this.url;
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) { reject(err); }
                const dbo = db.db(dbname);
                dbo.collection(collection).updateOne(filter, update, (err, result) => {
                    if (err) { reject(err); }
                    db.close();
                    resolve(result.matchedCount == 1);
                });
            });

        });
    }

    // getRecords
    // collection: the name of the collection to get from.
    // query: a mongo query object
    // returns a promise to an array of records
    public getRecords(collection: string, query: FilterQuery<any> = {}): Promise<any> {
        const dbname = this.dbName;
        const url = this.url;
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) { reject(err); }
                const dbo = db.db(dbname);
                dbo.collection(collection).find(query).toArray((err, result) => {
                    if (err) { reject(err); }
                    db.close();
                    resolve(result);
                });
            });
        });
    }

    // getOneRecords
    // collection: the name of the collection to get from.
    // query: a mongo query object
    // returns a promise to a single records
    public getOneRecord(collection: string, query: FilterQuery<any> = {}): Promise<any> {
        const dbname = this.dbName;
        const url = this.url;
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) { reject(err); }
                const dbo = db.db(dbname);
                dbo.collection(collection).findOne(query, (err, result) => {
                    if (err) { reject(err); }
                    db.close();
                    resolve(result);
                });
            });
        });
    }

    // deleteRecord
    // collection: the name of the collection to get from.
    // query: a mongo query object
    // returns a promise to a boolean indicating success
    public deleteRecord(collection: string, query: FilterQuery<any>= {}): Promise<boolean> {
        const dbname = this.dbName;
        const url = this.url;
        return new Promise(function(resolve, reject) {
            MongoClient.connect(url, function(err, db) {
                if (err) { reject(err); }
                const dbo = db.db(dbname);
                dbo.collection(collection).deleteOne(query, (err, result) => {
                    if (err) { reject(err); }
                    db.close();
                    resolve(result.deletedCount == 1);
                });
            });
        });

    }
}
