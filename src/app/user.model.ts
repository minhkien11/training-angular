export class User{
    ID: number;
    Name: string;
    Email: string;
    Tel: string;

    constructor (data:any){
        this.ID = data["id"];
        this.Name = data["name"];
        this.Email = data["email"];
        this.Tel = data["tel"];
    }
}