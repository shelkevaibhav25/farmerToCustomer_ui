import { HttpInterceptorFn } from '@angular/common/http';
import { GlobalConstant } from '../constants/constant';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem(GlobalConstant.TOKEN_KEY);

  const newReq = req.clone({
    setHeaders:{
      Authorization:`Bearer ${token}`
    }
  })
  return next(newReq).pipe(
    catchError((error:any)=>{

      if(error.status === 401){
        alert("Token Required")
        return throwError(()=>error)

      }else if(error.status === 500){
        alert("Internal Server Error")
        return throwError(()=>error)

      }else if(error.status === 400){
        alert('Bad Request')
        return throwError(()=>error)
      }
      else{
           return throwError(()=>error)
      }

     

    })
  );
};
