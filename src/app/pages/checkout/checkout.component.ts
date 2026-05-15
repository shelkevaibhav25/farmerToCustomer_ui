import { Component, inject, signal } from '@angular/core';
import { OrderProductService } from '../../core/services/order-product.service';
import { UserServiceService } from '../../core/services/user-service.service';
import { GlobalConstant } from '../../core/constants/constant';
import { UserModel } from '../../core/models/classes/user.model';
import { ApiResponseModel } from '../../core/models/classes/api.response';
import { ICartItems } from '../../core/models/interfaces/cart.interface';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
 loggedUserData: UserModel | null = null;
  cartItems = signal<ICartItems[]>([])

  router = inject(Router)
  orderService = inject(OrderProductService);
  userService  = inject(UserServiceService);

  orderForm!: FormGroup
  total:number = 0;
  subTotal:number = 0;
  packagingFee:number = 10;
  DeliveryFee: number = 40;

  constructor(private formBuilderServ:FormBuilder){

  }

  ngOnInit(){
    this.initializeOrderForm();
    this.getCartItems();

  }

  getCartItems(){
      const userId = this.userService.loggedInuser?.userId ?? 0
      console.log("Logged in user inside cart item: ", userId)
      if (!userId) {
        console.warn('Cannot fetch cart items: missing userId', this.loggedUserData)
        return
      }
  
      this.orderService.getCartItems(userId).subscribe({
        next:(res:ApiResponseModel)=>{
          console.log(res)
          this.cartItems.set((res?.data))
           this.subTotal = this.cartItems().reduce((acc, data)=>{
            return acc + data.pricePerKg * data.quantity;

          },0)
          this.total = this.packagingFee + this.DeliveryFee + this.subTotal

          
        },
        error:(error:any)=>{
          console.log(error)
        }
      })
  }

  initializeOrderForm(){
    this.orderForm = this.formBuilderServ.group({
      orderId:[0],
      customerId:[this.userService.loggedInuser?.userId],
      orderDate:[new Date()],
      status:[''],
      city:[''],
      state:[''],
      pincode:[''],
      addressLine1:[''],
      addressLine2:['']
    })
  } 

  readLoggedData(){
    const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY)

    if(localData!=null){
       this.loggedUserData = JSON.parse(localData) as UserModel
        console.log("LocalData: ", this.loggedUserData)
    }
    else {
    this.loggedUserData = null
    console.log("Header: no logged user data found")
    }
  }

  placeOrder(){
    const formValue = this.orderForm.value
    console.log("formValue: ", formValue);
    this.orderService.placeOrder(formValue).subscribe({
      next:(res:ApiResponseModel)=>{
        alert("Order Placed Succefully")
        this.orderForm.reset();
        this.orderService.addToCart$.next(true);
        this.router.navigateByUrl('/home')
        
      },
      error:(error:any)=>{
        alert("Failed to place the order!")

      }
    })

  }

}
