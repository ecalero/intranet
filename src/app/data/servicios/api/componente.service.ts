import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICIO_URL } from '@data/constantes';
import { IComponente } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  constructor(private http: HttpClient) { }

  getColumnasComponente(){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.COMPONENTE.COLUMNAS);
  }

  getFilasComponente(){
    return this.http.get<IComponente[]>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.COMPONENTE.FILAS);
  }

async  setComponente(componente: IComponente): Promise<any>{

    const params: HttpParams = new HttpParams().set('componente', JSON.stringify(componente));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.COMPONENTE.NUEVO, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      componente.IDCOMPONENTE = data["componente"].IDCOMPONENTE;
    } */

    return data;
  }

  async  actualizarComponente(componente: Required<IComponente> ): Promise<any>{
    console.log("legue a la actualizacion del servicio");

    console.log(componente);

    const params: HttpParams = new HttpParams().set('componente', JSON.stringify(componente));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.COMPONENTE.ACTUALIZAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      componente.IDCOMPONENTE = data["componente"].IDCOMPONENTE;
    } */

    return data;
  }

  async  eliminarComponente(IDCOMPONENTE:number): Promise<any>{
    console.log("legue a la eliminacion del servicio");
    const params: HttpParams = new HttpParams().set('IDCOMPONENTE', IDCOMPONENTE);

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.COMPONENTE.ELIMINAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      componente.IDCOMPONENTE = data["componente"].IDCOMPONENTE;
    } */

    return data;
  }

}
