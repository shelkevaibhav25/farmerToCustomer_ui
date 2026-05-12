
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { GlobalConstant } from '../../core/constants/constant';
import { UserModel } from '../../core/models/classes/user.model';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../core/services/user-service.service';
import { OrderProductService } from '../../core/services/order-product.service';
import { ApiResponseModel } from '../../core/models/classes/api.response';
import { IProduct } from '../../core/models/interfaces/farmerProduct.interface';
import { ICartItems } from '../../core/models/interfaces/cart.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

loggedUserData!: UserModel;
@ViewChild('shoppingCart') shoppingCartModel!: ElementRef

cartItems = signal<ICartItems[]>([])
totalPrice:number = 0




userServ = inject(UserServiceService)
router = inject(Router)
orderService = inject(OrderProductService)

constructor(){
  this.readLoggedData();
  this.userServ.onLogin$.subscribe({
    next:()=>{
      this.readLoggedData();
    }
  })
  
}

ngOnInit(){
  console.log("NgOninti executed")
 this.getCartItems();
  
  this.orderService.addToCart$.subscribe(()=>{
    debugger;
       this.getCartItems();
  })
 
}


readLoggedData(){
  const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY)
  if(localData != null){
    this.loggedUserData = JSON.parse(localData)
    console.log("LocalData: ", this.loggedUserData)
  }
}

  logOFF(){
  localStorage.removeItem(GlobalConstant.LOCAL_LOGIN_KEY)
  this.router.navigateByUrl('/login');
  }


  getCartItems(){
   debugger;
    console.log("Looged in user inside cart item: ",this.loggedUserData?.userId)
    this.orderService.getCartItems(this.loggedUserData?.userId).subscribe({
      next:(res:ApiResponseModel)=>{
        console.log(res)
        this.cartItems.set(res?.data);
         this.calculateTotalPrice();
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

  openCartModel(){
    if(this.shoppingCartModel){
      this.shoppingCartModel.nativeElement.style.display = 'block'
    }
  }

  closeShoppingCartModel(){
    if(this.shoppingCartModel){
      this.shoppingCartModel.nativeElement.style.display = 'none'
    }

  }

  calculateTotalPrice(){
   this.totalPrice = 0;  // Reset before calculating
   this.cartItems()?.forEach((item:ICartItems)=>{
      this.totalPrice = this.totalPrice + (item.quantity * item.pricePerKg)
    })
  }

}
