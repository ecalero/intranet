import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST, SERVICIO_URL } from '@data/constantes';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  constructor(private http: HttpClient) { }

  /* getColumnasSistema */
  getColumnasSistema1(
    data: {
      token: string;
    }
  ): Observable <any> {

    const response = { success: true, mensaje: ERRORS_CONST.LOGIN.ERROR, sistema: null};
    //return this.http.post<{error: boolean, msg: string, data: any}>(SERVICIO_URL.SLIM4.USUARIOS.LOGIN, data)
    return this.http.get<{success: boolean, mensaje: string, sistema: any}>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.SISTEMA.COLUMNAS)
      .pipe(
        map(r => {
          console.log("---> lo que devuelve el servicio getTablesSistema-->");
          console.log(r);
          response.mensaje = r.mensaje;
          response.success = r.success;
          response.sistema = r.sistema;
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
  /* Fin getColumnasSistema*/  
  getColumnasSistema(){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.SISTEMA.COLUMNAS);
  }
  
  getFilasSistema(){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.SISTEMA.FILAS);
  }

  

}
