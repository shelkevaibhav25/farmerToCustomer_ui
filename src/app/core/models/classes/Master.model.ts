export class Role{
    roleId:number;
    roleName:string;

    constructor(){
        this.roleId = 0;
        this.roleName = ''
    }
}

export class UserModel{
  


    roleId: number;
    roleName: string;
    

    constructor() {
        ;
        this.roleId = 0;
       this.roleName=''

}
}

export class Category{
    categoryId:number;
    name:string;

    constructor(){
        this.categoryId = 0;
        this.name = ''
    }
}

export class FarmerProduct{
    farmerProductId:number;
    farmerId:number;
    productId:number;
    pricePerKg:number;
    availableQuantity:number;
    availableDate:string;
    status:string;

    constructor(){
        this.farmerProductId = 0;
        this.farmerId = 0;
        this.productId = 0;
        this.pricePerKg = 0;
        this.availableQuantity = 0;
        this.availableDate = new Date().toISOString();
        this.status = ''
    }
}
