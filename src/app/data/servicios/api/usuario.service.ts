import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ERRORS_CONST, SERVICIO_URL } from '@data/constantes';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUsuario } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  getColumnasUsuario(){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO.COLUMNAS);
  }

  getFilasUsuario(){
    return this.http.get<IUsuario[]>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO.FILAS);
  }

async  setUsuario(usuario: IUsuario): Promise<any>{

    const params: HttpParams = new HttpParams().set('usuario', JSON.stringify(usuario));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO.NUEVO, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      usuario.IDUSUARIO = data["usuario"].IDUSUARIO;
    } */

    return data;
  }

  async  actualizarUsuario(usuario: IUsuario): Promise<any>{
    console.log("legue a la actualizacion del servicio");
    const params: HttpParams = new HttpParams().set('usuario', JSON.stringify(usuario));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO.ACTUALIZAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      usuario.IDUSUARIO = data["usuario"].IDUSUARIO;
    } */

    return data;
  }

  async  resetearClaveUsuario(usuario: IUsuario): Promise<any>{
    console.log("legue a la actualizacion del servicio");
    const params: HttpParams = new HttpParams().set('usuario', JSON.stringify(usuario));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO.RESETEAR_CLAVE, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      usuario.IDUSUARIO = data["usuario"].IDUSUARIO;
    } */

    return data;
  }

  async  eliminarUsuario(IDUSUARIO:number): Promise<any>{
    console.log("legue a la eliminacion del servicio");
    const params: HttpParams = new HttpParams().set('IDUSUARIO', IDUSUARIO);

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO.ELIMINAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      usuario.IDUSUARIO = data["usuario"].IDUSUARIO;
    } */

    return data;
  }



  getUsuarioById(IDUSUARIO:number){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.USUARIO.GETUSUARIOBYID+"?IDUSUARIO="+IDUSUARIO);
  }
}
