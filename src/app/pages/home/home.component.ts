import { AsyncPipe, DatePipe, LowerCasePipe, NgIf, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonImports } from '../../core/constants/CommonImports';
import { MasterService } from '../../core/services/master.service';
import { ApiResponseModel } from '../../core/models/classes/api.response';
import { Category } from '../../core/models/classes/Master.model';
import { interval, map, Observable, Subscription } from 'rxjs';
import { IProduct } from '../../core/models/interfaces/farmerProduct.interface';
import { UserServiceService } from '../../core/services/user-service.service';
import { UserModel } from '../../core/models/classes/user.model';
import { OrderProductService } from '../../core/services/order-product.service';
import { Icart } from '../../core/models/interfaces/order.intergace';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonImports.FORM_IMPORTS, AsyncPipe, DatePipe, NgOptimizedImage, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories:Category[] = [];
  subscription!: Subscription;

  categoryListObs$:Observable<Category[]> = new Observable<Category[]>;
  timer$ = interval(2000);
  productByFarmer = signal<IProduct[]>([])
  categoryOfProduct!:string
  selectedCategoryId!:number | null;
  selectedCartProduct = signal<IProduct | null>(null);
  cartQuantity = 0;
  estimatedTotal = signal<number>(0)

  userService=inject(UserServiceService)
  orderProductServ = inject(OrderProductService)

  farmers = signal<UserModel[]>([])



  constructor(private masterService: MasterService){

  }

  ngOnInit(){
    this.categoryListObs$ = this.masterService.getAllCategories().pipe(
      map((res:ApiResponseModel)=> res.data)
    );
    
    this.getAllCategories();
    this.loadAllProducts();
    this.getAllFarmers();
    
  }

  loadAllProducts(){
    this.masterService.getAllFarmerProducts().subscribe({
      next:(res:ApiResponseModel)=>{
        console.log("All farmer products: ", res);
        this.productByFarmer.set(res?.data);
      },
      error:(error:any)=>{
        console.log("Error loading products: ", error);
      }
    })
  }

  getAllCategories(){
   const cateSub =  this.masterService.getAllCategories().subscribe({
      next:(res:ApiResponseModel)=>{
        this.categories = res?.data;
        console.log("categories: ", this.categories)
      }
    })

    this.subscription = cateSub;
  }

  getAllFarmerProductsByCatId(item:Category){
    this.selectedCategoryId = item.categoryId;
    this.masterService.getAllFarmerProductsByCatid(item.categoryId).subscribe({
      next:(res:ApiResponseModel)=>{
        console.log("Farmer products filtered based on category id: ", res)
        this.productByFarmer.set(res?.data);
      },
      error:(error:any)=>{
        console.log(error)
      }
    })
  }

  scrollToFarmers() {
    const farmersSection = document.getElementById('farmersSection');
    if (farmersSection) {
      farmersSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

 getAllFarmers(){
    this.userService.getAllUsers().subscribe({
      next:(res:ApiResponseModel)=>{
        const farmers = res?.data?.filter((farmer:UserModel)=> farmer.roleId === 2)

        this.farmers.set(farmers);


      }
    })
  }

  openCartModel(product:IProduct){
    this.selectedCartProduct.set(product);
     this.orderProductServ.addToCart$.next(true);

  }

  onCancelClickModalPopup(){
    this.selectedCartProduct.set(null)
  }

  onSaveSelectedProduct(){
    console.log("Product added to cart: ")
    const productObj: Icart = {
      cartId: 0,
      customerId: this.userService.loggedInuser.userId,
      farmerProductId: this.selectedCartProduct()?.farmerProductId ?? 0,
      quantity: this.cartQuantity,
      addedAt: new Date().toISOString()
    }
    this.orderProductServ.addProductToCart(productObj).subscribe({
      next:(res:ApiResponseModel)=>{  
        alert("Product Added to Cart Successfully!")
        this.selectedCartProduct.set(null)
        this.cartQuantity = 0;
        this.orderProductServ.addToCart$.next(true);
      },
      error:(error:any)=>{
        console.log(error)
      }
    })

  }

  calculateTotalEstimate(){
    this.estimatedTotal.set(
    this.cartQuantity * (this.selectedCartProduct()?.pricePerKg ?? 0)
  );

  }

  ngOnDestroy(){
    //to clear memory
    this.subscription.unsubscribe();
  }

}
