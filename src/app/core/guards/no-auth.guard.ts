import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { INTERNAL_ROUTES } from '@data/constantes/routes';
import { AuthService } from '@data/servicios/api/auth.service';
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    const currentUser = this.authService.getUser;
    console.log(currentUser);
    if (currentUser) {
      console.log("estoy en NoAuthGuard");
     // this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_LIST);
      return false;
    }
    return true;
  }
}
