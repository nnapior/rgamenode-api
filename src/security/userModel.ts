import bcrypt from "bcrypt";

// represents a user in the system
export class UserModel {

    // when user password is set through here, it is stored encrypted
    set password(val: string) {
        this._password = UserModel.encryptString(val);
    }
    // returns encrypted password
    get password(): string {return this._password; }

    // does not encrypt password, expects already encrypted password
    public static fromObject = (obj: any): UserModel => {
        const mdl = new UserModel(obj.userID, obj.email, obj.username, "");
        mdl._password = obj.password;
        return mdl;
    }

    // encrypt a string using the bcrypt library
    public static encryptString(inval: string): string {
        try {
            const salt  = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(inval, salt);
        } catch (err) {
            return "*";
        }
    }
    public userID = "";
    public email = "";
    public username = "";
    private _password = "";

    // encrypts password
    public constructor(userID: string, email: string, username: string, password: string) {
        this.userID = userID;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    // includes encrypted password
    public toObject = (): any => ({userID: this.userID, email: this.email, username: this.username, password: this.password});

    // compares unencrypted password to encrypted password
    public validatePassword(password: string): boolean {
        if (this.password === "*") {return false; }
        return bcrypt.compareSync(password, this.password);
    }
}
