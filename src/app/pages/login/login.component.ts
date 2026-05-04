import { Component, Inject, inject } from '@angular/core';
import { RolesModel, UserLogin, UserModel } from '../../core/models/classes/user.model';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../core/services/user-service.service';
import { Roles } from '../../core/enums/Roles.enum';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, NgClass, NgFor, UpperCasePipe } from '@angular/common';
import { CommonImports } from '../../core/constants/CommonImports';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../core/constants/constant';
import { single } from 'rxjs';
import { MasterService } from '../../core/services/master.service';
import { ApiResponseModel, LoginResponseModel } from '../../core/models/classes/api.response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...CommonImports.FORM_IMPORTS, NgClass, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj:UserLogin = new UserLogin();
  userServ = inject(UserServiceService)
  router=inject(Router)
  isLoginActive:boolean = true;
  isLoginFormVisible = single<boolean>()
  masterService  = inject(MasterService)
  registerObj: UserModel = new UserModel();

  roles:RolesModel[]=[];



  ngOnInit(){
    
  }
  

  onLogin(){
    debugger;
    this.userServ.onLogin(this.loginObj).subscribe({
      next:(res:LoginResponseModel)=>{
        debugger
        localStorage.setItem(GlobalConstant.LOCAL_LOGIN_KEY,JSON.stringify(res.data));
        localStorage.setItem(GlobalConstant.TOKEN_KEY, res?.token)
        this.userServ.onLogin$.next(true);
        this.router.navigateByUrl('/home')
        
      },
      error:(error)=>{
        alert("Wrong Credentials")
      }
    })
  }

  selectAuthAction(action:string){

    if(action === 'register'){
      this.isLoginActive = false
      this.getRoles();
    }else{
      this.isLoginActive = true
    }
  }


  getRoles(){
    if(this.roles.length == 0){
      this.masterService.getAllRoles().subscribe({
      next:(res:any)=>{
        debugger;
        this.roles = res?.data.filter((role:RolesModel) => role.roleName !='SUPER_ADMIN' )
        console.log("Roles: ", this.roles)
      },
      error:(error)=>{
        console.log(error.message)
      }
    })

    }
    
  }

  createAccount(){

    this.userServ.onCreateAccount(this.registerObj).subscribe({
      next:(res:ApiResponseModel)=>{
        debugger;
        alert(res?.message);
        this.isLoginActive = true

      },
      error:(error)=>{
        alert("Some error occured while creating user!")
      }
    })

  }

 


  







}
