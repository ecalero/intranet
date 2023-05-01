import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    private _CargarScriptsService:CargarScriptsService,
    private _CargarStylesService:CargarStylesService,

  ) { }


  ngOnInit(): void {
/*     this._CargarScriptsService.cargaModulos(["footable/js/footable.min","bootstrap-switch/bootstrap-switch.min", "ckeditor/ckeditor"]);
      this._CargarScriptsService.carga(["pages/footable/footable.init"]); */





      this._CargarStylesService.nvccargacss(["vendors/bootstrap/css/bootstrap.min",
      "vendors/animate/animate.min",
      "vendors/fontawesome/css/all.min",
      "vendors/jarallax/jarallax",
      "vendors/jquery-magnific-popup/jquery.magnific-popup",
      "vendors/nouislider/nouislider.min",
      "vendors/nouislider/nouislider.pips",
      "vendors/odometer/odometer.min",
      "vendors/swiper/swiper.min",
      "vendors/halpes-icons/style",
      "vendors/tiny-slider/tiny-slider.min",
      "vendors/reey-font/stylesheet",
      "vendors/owl-carousel/owl.carousel.min",
      "vendors/owl-carousel/owl.theme.default.min"]);
      this._CargarStylesService.nvccarga(["halpes","halpes-responsive"]);


  }

}
