import { Component, inject, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MasterService } from '../../core/services/master.service';
import { HttpClient } from '@angular/common/http';
import { Category, Role } from '../../core/models/classes/Master.model';
import { ApiResponseModel, IRole } from '../../core/models/classes/api.response';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RolesModel } from '../../core/models/classes/user.model';
import { Irole } from '../../core/interceptors/Roles.module';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgFor, NgIf],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {
  activeTab: 'category' | 'roles' = 'category';
  tabName:string = 'role'
  masterServ = inject(MasterService)
  http = inject(HttpClient)
  roles: IRole[] = [];
  categories = signal<Category[]>([])

  roleForm!:FormGroup;
  caregoryForm!:FormGroup

  formBuilder = inject(FormBuilder)

  constructor(){
    this.createCategoryForm();
    this.createRoleForm();
    if(this.tabName === 'role'){
      this.getRoles();
    }else if(this.tabName === 'category'){
      this.getCategories();
    }
    
    
  }



  createRoleForm(){
    this.roleForm = new FormGroup({
      roleId: new FormControl(0),
      roleName: new FormControl('')
    })
  }


  createCategoryForm(){
    this.caregoryForm = this.formBuilder.group({
      categoryId:[0],
      name:['']
    })
  }



  toggleForm(tabName:string){

    if(tabName === 'role'){
      this.tabName = 'role'
      if(!this.roles){
        this.getRoles();
      }
      
    }else{
      this.tabName = 'category'
      this.getCategories();
  
     
    }

  }


  getRoles(){

    this.masterServ.getAllRoles().subscribe({
      next:(res:ApiResponseModel)=>{
        console.log("Roles: ", res);

        this.roles = res?.data;
        console.log("roles: ", this .roles)
      },
      error:(error:any)=>{
          console.log("Error occured: ", error)
      }
    })
    
  }

  getCategories(){
    this.masterServ.getAllCategories().subscribe({
      next:(res:ApiResponseModel)=>{
        this.categories.set(res?.data);
        console.log("Categories: ", this.categories)
      },
      error:(error)=>{
        console.log("Error occured: ", error)
      }
    })
  }


  onSaveRole(){
    const formValue = this.roleForm.value;
    this.masterServ.createRole(formValue).subscribe({
      next:(res:ApiResponseModel)=>{
        debugger
        console.log("Role Created: ", res)
        alert("Role is created successfully!")
        this.roles.push(...this.roles, res?.data)
        this.roleForm.reset();
      },
      error:(error:any)=>{
        alert("Role Creation is failed!")
      }
    })


  }


  onRoleEdit(role:Role){
    console.log("Role data: ", role)
    this.roleForm.patchValue({
      roleName:role.roleName,
      roleId:role.roleId
    });
  }

  onCategoryEdit(category:Category){
    this.caregoryForm.patchValue({
      categoryId:category.categoryId,
      name: category.name
    })

  }

  onUpdateRole(){
   const updateObj = this.roleForm.value;
   this.masterServ.updateRole(updateObj).subscribe({
      next:(res:ApiResponseModel)=>{
        debugger
        console.log("Update: ", res)
        alert('Role id is updated successfully!')
         const updatedRecord = this.roles.find((role:any)=> role.roleId === updateObj.roleId)
        if(updatedRecord !== undefined){
          updatedRecord.roleName = updateObj.roleName
        }
        this.roleForm.reset();
       
      },
      error:(error:any)=>{
        alert("Role id update failed!")
      }
    })
   
  }

  onSaveCategory(){
    const formValue = this.caregoryForm.value;
    this.masterServ.createCategory(formValue).subscribe({
      next:(res:ApiResponseModel)=>{
        alert("Category created successfully!")
      this.categories.update(prev => [...prev, res.data]);
        this.roleForm.reset();
      },
      error:(error:any)=>{
        alert("Category creation failed!")
      }
    })
  }

   onUpdateCategory(){
   const updateObj = this.caregoryForm.value;
   this.masterServ.updateCategory(updateObj).subscribe({
      next:(res:ApiResponseModel)=>{
        debugger
        console.log("Update category: ", res)
        alert('Category is updated successfully!')
        this.categories.update(prev=>prev.map(cat => cat.categoryId === res.data.categoryId ? res.data:cat))
        this.caregoryForm.reset();
       
      },
      error:(error:any)=>{
        alert("Category update failed!")
      }
    })
   
  }
  



}
