import { Component, Inject, inject } from '@angular/core';
import { UserLogin } from '../../core/models/classes/user.model';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../core/services/user-service.service';
import { Roles } from '../../core/enums/Roles.enum';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { CommonImports } from '../../core/constants/CommonImports';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonImports.FORM_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj:UserLogin =  {
    userName:'',
    password:'',
    role:0
  }
  userServ = inject(UserServiceService)

  onLogin(){
    this.loginObj.role = Roles.Farmer
    this.userServ.onLogin(this.loginObj).subscribe({
      
    })
  }


  







}
