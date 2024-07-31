export class RegisterDetails {
    public id: number;
    public name: string;
    public password: string;
    public email: string;
    public userType: string;

    constructor(id: number, name: string, password: string, email: string, userType: string) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.userType = userType;
    }
}