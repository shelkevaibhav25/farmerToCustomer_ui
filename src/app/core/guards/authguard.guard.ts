import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { GlobalConstant } from '../constants/constant';



export const authguardGuard: CanActivateFn = (route, state) => {
  debugger;
  const router = inject(Router)
  const isLocalDataPresent = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY);
  if(isLocalDataPresent == null){
   router.navigateByUrl('/login')
   return false;
  }
  else{
    return true
  }
};
