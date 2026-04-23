export class UserLogin {
    email: string;
    password: string;


    constructor() {
        this.email = '';
        this.password = ''
    }
}


export class UserModel {

    userId: number
    name: string
    email: string
    password: string
    roleId: number
    phone: string
    address: string
    createdAt: Date
    

    constructor() {
        this.userId = 0;
        this.name = '';
        this.email = '';
        this.password = '';
        this.roleId = 0;
        this.phone = '';
        this.address = '';
        this.createdAt = new Date();
    }

}

export class RolesModel {
    roleId: number;
    roleName: string;

    constructor() {
        this.roleId = 0;
        this.roleName = ''
    }
}
