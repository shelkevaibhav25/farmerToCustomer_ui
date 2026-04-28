import { HttpInterceptorFn } from '@angular/common/http';
import { GlobalConstant } from '../constants/constant';
import { map } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem(GlobalConstant.TOKEN_KEY);
  const newRequest = req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  })
  return next(newRequest).pipe(
    map((res:any)=>{
      debugger;
      return res
    })
  );

};
