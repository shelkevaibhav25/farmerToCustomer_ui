
import { Component } from '@angular/core';
import { GlobalConstant } from '../../core/constants/constant';
import { UserModel } from '../../core/models/classes/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

loggedUserData!: UserModel;

constructor(){
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
