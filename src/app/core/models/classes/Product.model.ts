export class ProductMaster {
    productId: number
    name: string
    categoryId: number
    description: string
    image: string


    constructor(){
        this.productId = 0;
        this.name = '';
        this.categoryId = 0;
        this.description = '',
        this.image = ''
    }

}

export class PlaceOrder{
    orderId: number
  customerId: number
  orderDate: Date
  status: string
  city: string
  state: string
  pincode: string
  addressLine1: string
  addressLine2: string

  constructor(){
    this.orderId = 0;
    this.customerId = 0;
    this.orderDate = new Date();
    this.status = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.addressLine1 = '';
    this.addressLine2 = '';

}
}