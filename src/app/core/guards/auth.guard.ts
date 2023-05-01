import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { INTERNAL_ROUTES } from '@data/constantes/routes';
import { AuthService } from '@data/servicios/api/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    

/*     const token = localStorage.getItem("token");
    console.log();
    if (token){
      return true;
    } */

    const jwtHelper = new JwtHelperService();
    console.log("Tokeninterceptor--->");
    console.log(jwtHelper);


     const currentUser = this.authService.getUser;
     console.log("guard---------->");
    console.log(currentUser);

    if (jwtHelper.isTokenExpired(currentUser.ACCESS_TOKEN)) {
      // token expired 
      console.log("token expirado");
    } else {
      // token valid
      console.log("token valido");
    } 
    
    console.log("length");
    console.log(Object.keys(currentUser).length);
    if (Object.keys(currentUser).length !== 0) {
      console.log("el objeto tiene informacion");
      //verifico si expiro el token 
      if (!jwtHelper.isTokenExpired(currentUser.ACCESS_TOKEN)) {
        // token expired 
        console.log("token no expirado");
        return true;
      }else{
        //token expirado
        //se debe ejecutar el refrescado del token
      }

    } 
    this.router.navigate([INTERNAL_ROUTES.AUTH_LOGIN], {
      queryParams: {returnUrl: state.url}
    });
    return false;
  }
  
}
