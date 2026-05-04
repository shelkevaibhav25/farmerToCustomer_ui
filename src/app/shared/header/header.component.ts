
import { Component, inject } from '@angular/core';
import { GlobalConstant } from '../../core/constants/constant';
import { UserModel } from '../../core/models/classes/user.model';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../core/services/user-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

loggedUserData!: UserModel;
userServ = inject(UserServiceService)
router = inject(Router)

constructor(){
  this.readLoggedData();
  this.userServ.onLogin$.subscribe({
    next:()=>{
      this.readLoggedData();
    }
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
    
  }

}
