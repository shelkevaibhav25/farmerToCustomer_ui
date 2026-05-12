import { Directive, ElementRef, inject } from '@angular/core';
import { UserServiceService } from '../../core/services/user-service.service';

@Directive({
  selector: '[appHideForFarmer]',
  standalone: true
})
export class HideForFarmerDirective {

  userService = inject(UserServiceService)



  constructor(private elementRef:ElementRef) { 
   
   if(this.userService.loggedInuser.roleId === 2){
    this.elementRef.nativeElement.style.display = 'none'
   }
    console.log("Directive got initialized")
  }

}
