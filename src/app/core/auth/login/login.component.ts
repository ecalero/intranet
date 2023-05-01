import { Component } from '@angular/core';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

/*   public loginForm:{
    correo: {
      val: string;
      error: string;
      isValid: () =>boolean
    },
    clave: {
      val: string;
      error: string;
      isValid: () =>boolean
    }
  }; */

  constructor(private _CargarScriptsService:CargarScriptsService, private _CargarStylesService:CargarStylesService) {
    _CargarScriptsService.carga(["login-init"]);
    _CargarStylesService.carga(["pages/login-register-lock"]);
    this._CargarStylesService.carga(["style","pages/dashboard1"]);



  }



}
