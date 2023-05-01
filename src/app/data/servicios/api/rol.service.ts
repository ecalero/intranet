import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST, SERVICIO_URL } from '@data/constantes';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IRol } from '@data/interfaces';
@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  getColumnasUsuarioRol(){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO_ROL.COLUMNAS);
  }

  getFilasUsuarioRol(){
    return this.http.get<IRol[]>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO_ROL.FILAS);
  }

async  setRol(rol: IRol): Promise<any>{

    const params: HttpParams = new HttpParams().set('rol', JSON.stringify(rol));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ROL.NUEVO, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      rol.IDROL = data["rol"].IDROL;
    } */

    return data;
  }

  async  actualizarRol(rol: IRol): Promise<any>{
    console.log("legue a la actualizacion del servicio");
    const params: HttpParams = new HttpParams().set('rol', JSON.stringify(rol));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ROL.ACTUALIZAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      rol.IDROL = data["rol"].IDROL;
    } */

    return data;
  }

  async  eliminarRol(IDROL:number): Promise<any>{
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



  getRolById(IDROL:number){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ROL.GETROLBYID+"?IDROL="+IDROL);
  }

}
