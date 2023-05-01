import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';
declare let $: any;
@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  constructor(private _CargarScriptsService:CargarScriptsService, private _CargarStylesService:CargarStylesService) { }

  ngOnInit(): void {
    this._CargarScriptsService.cargaModulos(["footable/js/footable.min","bootstrap-switch/bootstrap-switch.min.js"]);
    this._CargarScriptsService.carga(["pages/footable/footable.init"]);
    this._CargarStylesService.cargaModulos(["bootstrap-switch/bootstrap-switch.min","footable/css/footable.bootstrap.min","Magnific-Popup-master/dist/magnific-popup"]);
    this._CargarStylesService.carga(["pages/footable-page","pages/bootstrap-switch"]);
  }

}
