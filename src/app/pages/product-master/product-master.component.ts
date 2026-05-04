import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterService } from '../../core/services/master.service';
import { ApiResponseModel, IMasterProducts } from '../../core/models/classes/api.response';
import { Category } from '../../core/models/classes/Master.model';
import { NgFor, NgIf } from '@angular/common';
import { ProductMasterService } from '../../core/services/product-master.service';

@Component({
  selector: 'app-product-master',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './product-master.component.html',
  styleUrl: './product-master.component.css'
})
export class ProductMasterComponent {

  @ViewChild('formSection') formSection!: ElementRef;
  @ViewChild('tableSection') tableSection!: ElementRef;

  productForm!: FormGroup;
  masterSer = inject(MasterService)
  productMasterService = inject(ProductMasterService)
  categories: Category[] = [];
  products: IMasterProducts[] = [];


  constructor() {
    this.createProductForm();
    this.getProductCategories();
    this.getMasterProducts();
    this.productForm.get('image')?.valueChanges.subscribe((value) => {
      this.onImageUrlChange();
    })


  }


  createProductForm() {
    this.productForm = new FormGroup({
      productId: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      categoryId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    })

  }

  getProductCategories() {
    this.masterSer.getAllCategories().subscribe({
      next: (res: ApiResponseModel) => {

        this.categories = res?.data;
        console.log("product categories: ", this.categories)
      }
    })
  }

  getMasterProducts() {
    this.productMasterService.getAllProducts().subscribe({
      next: (res: ApiResponseModel) => {
        debugger
        this.products = res?.data;
        console.log("Products: ", this.products)
      }
    })
  }

  onImageUrlChange() {
    const imageUrl = this.productForm.get('image')?.value;
    const previewImg = document.getElementById('previewImg') as HTMLImageElement;
    if (previewImg && imageUrl) {
      previewImg.src = imageUrl;
      previewImg.onerror = () => {
        previewImg.src = 'https://via.placeholder.com/240?text=Invalid+URL';
      };
    }
  }


  onSaveProduct() {
    const formValueObj = this.productForm.value;
    this.productMasterService.createMasterProduct(formValueObj).subscribe({
      next: (res: ApiResponseModel) => {
        console.log("Product details: ", res)
        alert('Product created successfully!')
        this.products.push(...this.products, res?.data)
        this.onResetForm();
        this.scrollToTable();
      },
      error: (error: any) => {
        alert("Product is not created!")
      }
    })

  }

  onEdit(data: IMasterProducts) {
    this.productForm.patchValue({
      productId: data.productId,
      name: data.name,
      categoryId: data.categoryId,
      description: data.description,
      image: data.image
    })
    this.scrollToForm();
  }

  onUpdateProduct() {
    const formValueObj = this.productForm.value;
    this.productMasterService.updateMasterProduct(formValueObj).subscribe({
      next: (res: ApiResponseModel) => {
        alert('Product updated successfully!')
        const updatedObjeIndex = this.products.findIndex((product: IMasterProducts) => product.productId === formValueObj.productId)

        if (updatedObjeIndex != -1) {
          this.products[updatedObjeIndex] = { ...this.products[updatedObjeIndex], ...formValueObj }
        }
        this.onResetForm();
        this.scrollToTable();

      },
      error: (error: any) => {
        alert("Update failed!")
      }
    })
  }

  onDeleteProduct(product: IMasterProducts) {
    this.productMasterService.deleteMasterProduct(product).subscribe({
      next: (res: ApiResponseModel) => {
        alert('Product removed successfully!')
        const updatedObjeIndex = this.products.findIndex((p: IMasterProducts) => p.productId === product.productId)
        if (updatedObjeIndex !== -1) {
          this.products.splice(updatedObjeIndex, 1);
        }
      },
      error: (error: any) => {
        alert('Product cannot be deleted. Some error occured!')
      }
    })
  }

  scrollToTable() {
    setTimeout(() => {
      this.tableSection?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  scrollToForm() {
    setTimeout(() => {
      this.formSection?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  onResetForm() {
    this.productForm.reset({
      productId: 0,
      name: '',
      categoryId: '',
      description: '',
      image: ''
    });
  }

}
