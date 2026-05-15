
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

  loggedUserData: UserModel | null = null;
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
      this.getCartItems();
    }
  })
}

ngOnInit(){
  console.log("NgOnInit executed")
  this.readLoggedData();
  this.getCartItems();
  this.orderService.addToCart$.subscribe(()=>{
    this.getCartItems();
  })
}


readLoggedData(){
  const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY)
  if(localData){
    this.loggedUserData = JSON.parse(localData) as UserModel
    console.log("LocalData: ", this.loggedUserData)
  } else {
    this.loggedUserData = null
    console.log("Header: no logged user data found")
  }
}

  logOFF(){
    localStorage.removeItem(GlobalConstant.LOCAL_LOGIN_KEY)
    this.router.navigateByUrl('/login');
  }


  getCartItems(){
    const userId = this.loggedUserData?.userId ?? 0
    console.log("Logged in user inside cart item: ", userId)
    if (!userId) {
      console.warn('Cannot fetch cart items: missing userId', this.loggedUserData)
      return
    }

    this.orderService.getCartItems(userId).subscribe({
      next:(res:ApiResponseModel)=>{
        console.log(res)
        this.cartItems.set(Array.isArray(res?.data) ? res.data : [])
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

  deleteCartItem(cartItem:ICartItems){
    const isDelete = confirm("Are you sure you want to delete the product?")
    if(isDelete){
      this.orderService.deleteCartItem(cartItem.cartId).subscribe({
      next:(res:ApiResponseModel)=>{
        alert("Cart Item Deleted Successfully!")
        this.cartItems.update(prev => prev.filter((item:ICartItems)=> item.cartId != cartItem.cartId))
        this.calculateTotalPrice();
        

      },
      error:(error:any)=>{
        alert("Failed to delete cart item!")
      }
    })
    }
    
  }

  checkOut(){
    this.router.navigate(['/checkout']);
    this.closeShoppingCartModel();
  }

}
