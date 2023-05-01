import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST, SERVICIO_URL } from '@data/constantes';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUsuarioRol,IUsuario } from '@data/interfaces';
@Injectable({
  providedIn: 'root'
})
export class UsuariorolService {

  constructor(private http: HttpClient) { }

  getColumnasUsuarioRolByIdUsuario(usuariorol:IUsuarioRol){
    const params: HttpParams = new HttpParams().set('usuariorol', JSON.stringify(usuariorol));
    console.log("------usuariorol----->");
    console.log(usuariorol);
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO_ROL.COLUMNAS, params, { headers: headers });
  }

  getFilasUsuarioRolByIdUsuario(usuariorol:IUsuarioRol){
    //return this.http.get<IUsuarioRol[]>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO_ROL.FILAS);
    const params: HttpParams = new HttpParams().set('usuariorol', JSON.stringify(usuariorol));
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<IUsuarioRol[]>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO_ROL.FILAS, params, { headers: headers });
  }


  async  actualizarUsuarioRol(usuariorol: IUsuarioRol): Promise<any>{
    console.log("legue a la actualizacion del servicio");
    const params: HttpParams = new HttpParams().set('usuariorol', JSON.stringify(usuariorol));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO_ROL.ACTUALIZAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      rol.IDROL = data["rol"].IDROL;
    } */

    return data;
  }

  async  eliminarUsuarioRol(IDROL:number): Promise<any>{
    console.log("legue a la eliminacion del servicio");
    const params: HttpParams = new HttpParams().set('IDROL', IDROL);

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ROL.ELIMINAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      rol.IDROL = data["rol"].IDROL;
    } */

    return data;
  }


}
