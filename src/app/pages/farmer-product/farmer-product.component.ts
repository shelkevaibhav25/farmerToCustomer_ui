import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../core/services/master.service';
import { FarmerProduct } from '../../core/models/classes/Master.model';
import { ApiResponseModel, IMasterProducts } from '../../core/models/classes/api.response';
import { UserModel } from '../../core/models/classes/user.model';
import { GlobalConstant } from '../../core/constants/constant';
import { IProduct } from '../../core/models/interfaces/farmerProduct.interface';
import { ProductMasterService } from '../../core/services/product-master.service';
import { HideForFarmerDirective } from '../../shared/directives/hide-for-farmer.directive';
import { UserServiceService } from '../../core/services/user-service.service';

@Component({
  selector: 'app-farmer-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HideForFarmerDirective],
  templateUrl: './farmer-product.component.html',
  styleUrl: './farmer-product.component.css'
})
export class FarmerProductComponent {
  private formBuilder = inject(FormBuilder);
  private masterServ = inject(MasterService);
  private productMasterServ = inject(ProductMasterService)
  userService = inject(UserServiceService);

  farmerProducts = signal<IProduct[]>([]);
  isLoading = signal(false);
  loggedInuser: UserModel = new UserModel();
  products: IMasterProducts[]= []

  statusOptions:string[] = ['Available', 'Limited', 'Out of Stock', 'Inactive'];

  productForm = this.formBuilder.group({
    farmerProductId: [0],
    farmerId: this.loggedInuser.userId,
    productId: [0, [Validators.required, Validators.min(1)]],
    pricePerKg: [0, [Validators.required, Validators.min(1)]],
    availableQuantity: [0, [Validators.required, Validators.min(1)]],
    availableDate: [this.getDateTimeLocalValue(new Date()), [Validators.required]],
    status: ['Available', [Validators.required]]
  });

  constructor(){

    // const localData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY);
    // if(localData!=null){
    //   this.loggedInuser = JSON.parse(localData);
    // }
    this.loggedInuser = this.userService.loggedInuser;

    this.getProducts();
    
  }

  getProducts(){
    this.productMasterServ.getAllProducts().subscribe({
      next:(res:ApiResponseModel)=>{
          this.products = res?.data;
      },
      error:(error:any)=>{
        console.log("error occured")
      }
    })
  }


  ngOnInit(){
    if(this.loggedInuser.roleId === 1){
      this.getFarmerProducts();
    }
    else{
      this.getLoggedInFarmerProducts();
    }
  }

  getFarmerProducts(){
    this.isLoading.set(true);
    this.masterServ.getAllFarmerProducts().subscribe({
      next:(res:ApiResponseModel)=>{
        this.farmerProducts.set(Array.isArray(res?.data) ? res.data : []);
        this.isLoading.set(false);
      },
      error:(error:any)=>{
        console.log("Error occured: ", error);
        this.isLoading.set(false);
      }
    })
  }

  getLoggedInFarmerProducts(){
    this.isLoading.set(true);
    this.masterServ.getAllFarmerProductsLoggedFamer(this.loggedInuser.userId).subscribe({
      next:(res:ApiResponseModel)=>{
        this.farmerProducts.set(Array.isArray(res?.data) ? res.data : []);
        this.isLoading.set(false);
      },
      error:(error:any)=>{
        console.log("Error occured: ", error);
        this.isLoading.set(false);
      }
    })
  }

  onSaveProduct(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.getPayload();
    this.masterServ.createFarmerProduct(formValue).subscribe({
      next:(res:ApiResponseModel)=>{
        alert("Product is created successfully!");
        this.farmerProducts.update(prev => [...prev, res?.data ?? formValue]);
        this.resetForm();
      },
      error:(error:any)=>{
        console.log("Error occured: ", error);
        alert("Product creation failed!");
      }
    })
  }

  onProductEdit(product:FarmerProduct){
    this.productForm.patchValue({
      farmerProductId: product.farmerProductId,
      farmerId: product.farmerId,
      productId: product.productId,
      pricePerKg: product.pricePerKg,
      availableQuantity: product.availableQuantity,
      availableDate: this.getDateTimeLocalValue(product.availableDate),
      status: product.status
    })
  }

  onUpdateProduct(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    const updateObj = this.getPayload();
    this.masterServ.updateFarmerProduct(updateObj).subscribe({
      next:(res:ApiResponseModel)=>{
        alert('Product is updated successfully!');
        const updatedProduct = res?.data ?? updateObj;
        this.farmerProducts.update(prev => prev.map(product =>
          product.farmerProductId === updateObj.farmerProductId ? updatedProduct : product
        ));
        this.resetForm();
      },
      error:(error:any)=>{
        console.log("Error occured: ", error);
        alert("Product update failed!");
      }
    })
  }

  onDeleteProduct(product:FarmerProduct){
    const isConfirmed = confirm(`Delete farmer product #${product.farmerProductId}?`);
    if(!isConfirmed){
      return;
    }

    this.masterServ.deleteFarmerProduct(product.farmerProductId).subscribe({
      next:()=>{
        alert("Product is deleted successfully!");
        this.farmerProducts.update(prev => prev.filter(item => item.farmerProductId !== product.farmerProductId));
      },
      error:(error:any)=>{
        console.log("Error occured: ", error);
        alert("Product delete failed!");
      }
    })
  }

  resetForm(){
    this.productForm.reset({
      farmerProductId: 0,
      farmerId: 0,
      productId: 0,
      pricePerKg: 0,
      availableQuantity: 0,
      availableDate: this.getDateTimeLocalValue(new Date()),
      status: 'Available'
    });
  }

  private getPayload():FarmerProduct{
    const formValue = this.productForm.getRawValue();
    return {
      farmerProductId: Number(formValue.farmerProductId ?? 0),
      farmerId: Number(this.loggedInuser.userId ?? 0),
      productId: Number(formValue.productId ?? 0),
      pricePerKg: Number(formValue.pricePerKg ?? 0),
      availableQuantity: Number(formValue.availableQuantity ?? 0),
      availableDate: new Date(formValue.availableDate ?? new Date()).toISOString(),
      status: formValue.status ?? 'Available'
    };
  }

  private getDateTimeLocalValue(value:Date|string):string{
    const date = new Date(value);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
  }

}
