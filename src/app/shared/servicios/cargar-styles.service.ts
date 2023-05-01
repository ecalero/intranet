import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarStylesService {

  constructor() { }

  carga(archivos: string[]){
    for(let archivo of archivos){
      let script = document.createElement('link');
      script.href = "./assets/css/"+archivo+".css";
      script.rel = "stylesheet";
      let body= document.getElementsByTagName("head")[0];
      body.appendChild(script);
    }
  }

  cargaModulos(archivos: string[]){
    for(let archivo of archivos){
      let script = document.createElement('link');
      script.href = "./assets/node_modules/"+archivo+".css";
      script.rel = "stylesheet";
      let body= document.getElementsByTagName("head")[0];
      body.appendChild(script);
    }
  }

  /**estilos nvo chimbote*/
  nvccarga(archivos: string[]){
    for(let archivo of archivos){
      let script = document.createElement('link');
      script.href = "./assets/nvochimbote/assets/css/"+archivo+".css";
      script.rel = "stylesheet";
      let body= document.getElementsByTagName("head")[0];
      body.appendChild(script);
    }
  }
  /*carga todo estilo de raiz*/
  nvccargacss(archivos: string[]){
    for(let archivo of archivos){
      let script = document.createElement('link');
      script.href = "./assets/nvochimbote/assets/"+archivo+".css";
      script.rel = "stylesheet";
      let body= document.getElementsByTagName("head")[0];
      body.appendChild(script);
    }
  }

}
