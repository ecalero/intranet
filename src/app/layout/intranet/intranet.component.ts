import { Component, OnInit } from '@angular/core';
import {CargarScriptsService} from '@shared/servicios/cargar-scripts.service'
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';
//import * as $ from 'jquery';
declare let $: any;

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.css']
})
export class IntranetComponent implements OnInit {

  constructor(
    private _CargarScriptsService:CargarScriptsService,
    private _CargarStylesService:CargarStylesService) {
    this._CargarScriptsService.carga(["waves","perfect-scrollbar.jquery.min","custom","dashboard1","custom","dashboard1","custom","dashboard1"]);
    this._CargarScriptsService.cargaModulos(["popper/popper.min","bootstrap/dist/js/bootstrap.min","jquery-sparkline/jquery.sparkline.min","toast-master/js/jquery.toast"]);
    this._CargarStylesService.carga(["style","pages/dashboard1"]);
    this._CargarStylesService.cargaModulos(["morrisjs/morris","select2/dist/css/select2.min","toast-master/css/jquery.toast"]);


  }

  ngOnInit(): void {
    $(document).ready(function() {
      $(".preloader").fadeOut();
      $('body').addClass('skin-red-dark fixed-layout mat-typography');

    });





  }


}
