"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
// represents a user in the system
var UserModel = /** @class */ (function () {
    // encrypts password
    function UserModel(email, username, password) {
        var _this = this;
        this.email = "";
        this.username = "";
        this._password = "";
        this._id = "";
        // includes encrypted password
        this.toObject = function () { return ({ email: _this.email, username: _this.username, password: _this.password, _id: _this._id }); };
        this.email = email;
        this.username = username;
        this.password = password;
    }
    Object.defineProperty(UserModel.prototype, "password", {
        // returns encrypted password
        get: function () { return this._password; },
        // when user password is set through here, it is stored encrypted
        set: function (val) {
            this._password = UserModel.encryptString(val);
        },
        enumerable: true,
        configurable: true
    });
    // encrypt a string using the bcrypt library
    UserModel.encryptString = function (inval) {
        try {
            var salt = bcrypt_1.default.genSaltSync(10);
            return bcrypt_1.default.hashSync(inval, salt);
        }
        catch (err) {
            return "*";
        }
    };
    // compares unencrypted password to encrypted password
    UserModel.prototype.validatePassword = function (password) {
        if (this.password === "*") {
            return false;
        }
        return bcrypt_1.default.compareSync(password, this.password);
    };
    // does not encrypt password, expects already encrypted password
    UserModel.fromObject = function (obj) {
        var mdl = new UserModel(obj.email, obj.username, "");
        mdl._password = obj.password;
        mdl._id = obj._id;
        return mdl;
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map