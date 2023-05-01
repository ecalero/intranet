import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICIO_URL } from '@data/constantes';
import { IPlantilla } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

  constructor(private http: HttpClient) { }

  getColumnasPlantilla(){
    return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.PLANTILLA.COLUMNAS);
  }

  getFilasPlantilla(){
    return this.http.get<IPlantilla[]>(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.PLANTILLA.FILAS);
  }

async  setPlantilla(plantilla: IPlantilla): Promise<any>{

    const params: HttpParams = new HttpParams().set('plantilla', JSON.stringify(plantilla));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.PLANTILLA.NUEVO, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      plantilla.IDPLANTILLA = data["plantilla"].IDPLANTILLA;
    } */

    return data;
  }

  async  actualizarPlantilla(plantilla: IPlantilla): Promise<any>{
    console.log("legue a la actualizacion del servicio");
    const params: HttpParams = new HttpParams().set('plantilla', JSON.stringify(plantilla));

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.PLANTILLA.ACTUALIZAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      plantilla.IDPLANTILLA = data["plantilla"].IDPLANTILLA;
    } */

    return data;
  }

  async  eliminarPlantilla(IDPLANTILLA:number): Promise<any>{
    console.log("legue a la eliminacion del servicio");
    const params: HttpParams = new HttpParams().set('IDPLANTILLA', IDPLANTILLA);

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    //let data = await this.http.post(API_URL+"ajax/app-guardar-convoy",params, {headers: headers});
    let data = await this.http.post(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.PLANTILLA.ELIMINAR, params, { headers: headers }).toPromise();
    console.log("DATA ONLINE----------------------------->");
    console.log(data);
/*     if (data["success"]) {
      plantilla.IDPLANTILLA = data["plantilla"].IDPLANTILLA;
    } */

    return data;
  }


}
