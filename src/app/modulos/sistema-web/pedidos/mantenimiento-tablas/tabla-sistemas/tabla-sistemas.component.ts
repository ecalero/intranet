import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '@data/servicios/api/auth.service';
import { SistemaService } from '@data/servicios/api/sistema.service';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';
declare let $: any;

@Component({
  selector: 'app-tabla-sistemas',
  templateUrl: './tabla-sistemas.component.html',
  styleUrls: ['./tabla-sistemas.component.css']
})
export class TablaSistemasComponent implements OnInit {

  columnaSistemas:any;
  filaSistemas:any = [];
  usuario:any;
  constructor(private _CargarScriptsService:CargarScriptsService, private _CargarStylesService:CargarStylesService, private sistemaService: SistemaService, private authService: AuthService ) 
  { 

  }

  ngOnInit(): void {

    this._CargarScriptsService.cargaModulos(["footable/js/footable.min","bootstrap-switch/bootstrap-switch.min.js"]);
    this._CargarScriptsService.carga(["pages/footable/footable.init"]);
    this._CargarStylesService.cargaModulos(["footable/css/footable.bootstrap.min","Magnific-Popup-master/dist/magnific-popup"]);
    this._CargarStylesService.carga(["pages/footable-page"]);
    //this.columnaSistemas = this.sistemaService.getColumnasSistema();
    this.sistemaService.getColumnasSistema()
    .subscribe(response => {
      this.columnaSistemas = response;
      console.log("columnas de la tabla");
      console.log(this.columnaSistemas);
      this.sistemaService.getFilasSistema()
      .subscribe(response => {
        this.filaSistemas = response;
        console.log("filas de la tabla");
        console.log(this.filaSistemas);
  
        if (this.filaSistemas.length > 0) {
          const filas = this.filaSistemas;
          const columnas = this.columnaSistemas;
          $( document ).ready(function() {
            console.log( "ready!" );
            $('.table').footable({
              "columns": columnas,
              "rows": filas
          });
          });
        }
      });
    });
  }

}
