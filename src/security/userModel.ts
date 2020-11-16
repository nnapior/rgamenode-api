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
        const mdl = new UserModel(obj.email, obj.username, "");
        mdl._password = obj.password;
        mdl._id=obj._id;
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
    public email = "";
    public username = "";
    private _password = "";
    public _id="";

    // encrypts password
    public constructor(email: string, username: string, password: string) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    // includes encrypted password
    public toObject = (): any => ({email: this.email, username: this.username, password: this.password,_id:this._id});

    // compares unencrypted password to encrypted password
    public validatePassword(password: string): boolean {
        if (this.password === "*") {return false; }
        return bcrypt.compareSync(password, this.password);
    }
}
