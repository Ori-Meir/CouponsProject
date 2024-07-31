import { time } from "console";
import { StringLiteral } from "typescript";

export class Company {
    public id: number;
    public name: string;
    public email: string;
    public password: string;
    public coupons: any;



    constructor(id: number, name: string, email: string, password: string, coupons: any) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.coupons = coupons;


    }
}