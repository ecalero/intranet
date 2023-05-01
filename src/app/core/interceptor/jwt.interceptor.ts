import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@data/servicios/api/auth.service';


//comprobar si expiró el token

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler): 
    Observable<HttpEvent<any>> {

      const currentUser = this.authService.getUser;
      const isAuthenticated = currentUser && currentUser.ACCESS_TOKEN;
      
      
      if (isAuthenticated) {
        //console.log(currentUser);
        request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.ACCESS_TOKEN}`
              }
          });
      }  
    return next.handle(request);
  }
}
