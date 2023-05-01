import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST, SERVICIO_URL } from '@data/constantes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntranetService {

  constructor(private http: HttpClient) { }


  /* getMenuAccesos */
  getMenuAccesos(
    data: {
      token: string;
    }
  ): Observable <any> {
    console.log("estoy en el servicio Intranet ....");
    console.log(data);
    const params = new HttpParams({
      fromObject: data
    });
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    const response = { success: true, mensaje: ERRORS_CONST.LOGIN.ERROR, menu: null};
    //return this.http.post<{error: boolean, msg: string, data: any}>(SERVICIO_URL.SLIM4.USUARIOS.LOGIN, data)
    return this.http.post<{success: boolean, mensaje: string, menu: any}>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.GENERAL.MENU,params, {headers: headers})
      .pipe(
        map(r => {
          console.log("---> lo que devuelve el servicio-->");
          console.log(r);
          response.mensaje = r.mensaje;
          response.success = r.success;
          response.menu = r.menu;
          if (!response.success) {
            console.log(response.mensaje);
            //this.router.navigateByUrl(INTERNAL_ROUTES.INTRANET_USER_LIST);
          }
          return response;
        }),
        catchError( e => {
          return of(response);
        })
      );
  }
  /* Fin getMenuAccesos*/


}
