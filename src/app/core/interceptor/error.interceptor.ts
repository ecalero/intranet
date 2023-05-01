import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { API_ROUTES } from '@data/constantes/routes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler): 
    Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError(err => {
            if (
                [401, 403, 404].indexOf(err.status) !== -1 &&
                request.url !== API_ROUTES.AUTH.LOGIN
            ) {
                this.router.navigateByUrl('/' + err.status);
            }
            return throwError(err);
        })
    );
  }
}
