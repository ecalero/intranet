import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICIO_URL } from '@data/constantes';

@Injectable({
  providedIn: 'root'
})
export class PaginaService {

  constructor(private http: HttpClient) { }

    /* Fin getColumnasSistema*/  
    getColumnasSistema(){
      return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.SISTEMA.COLUMNAS);
    }
    
    getFilasSistema(){
      return this.http.get(SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.SISTEMA.FILAS);
    }
  
}
