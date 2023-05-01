import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  constructor() { }

  carga(archivos: string[]){
    for(let archivo of archivos){
      let script = document.createElement('script');
      script.src = "./assets/js/"+archivo+".js";
      let body= document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }
  nvccargaModulos(archivos: string[]){
    for(let archivo of archivos){
      let script = document.createElement('script');
      script.src = "./assets/nvochimbote/assets/vendors/"+archivo+".js";
      let body= document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
    return true;
  }

/*cargar script para nvo chimbote */
nvccarga(archivos: string[]){
  for(let archivo of archivos){
    let script = document.createElement('script');
    script.src = "./assets/nvochimbote/assets/js/"+archivo+".js";
    let body= document.getElementsByTagName("body")[0];
    body.appendChild(script);
  }
}
cargaModulos(archivos: string[]){
  for(let archivo of archivos){
    let script = document.createElement('script');
    script.src = "./assets/node_modules/"+archivo+".js";
    let body= document.getElementsByTagName("body")[0];
    body.appendChild(script);
  }
  return true;
}

}
