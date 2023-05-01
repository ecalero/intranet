import { Component, OnInit } from '@angular/core';
import { AuthService } from '@data/servicios/api/auth.service';
import { IntranetService } from '@data/servicios/api/intranet.service';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';


declare let $: any;
@Component({
  selector: 'app-menu-izquierda',
  templateUrl: './menu-izquierda.component.html',
  styleUrls: ['./menu-izquierda.component.css']
})
export class MenuIzquierdaComponent implements OnInit {

  menu:any;
  usuario:any;
  constructor(private authService: AuthService,private intranetService: IntranetService, private _CargarScriptsService:CargarScriptsService ) { 
    
    
  }

  logout(){

    this.authService.logout();
  }

  async getMenuAccesos() {
    console.log("estoy aqui getMenuAccesos");
      // console.log('authenticated', this.loginForm.value);

      this.usuario = this.authService.getUser;
      return this.intranetService.getMenuAccesos({token: this.usuario.ACCESS_TOKEN})
      .subscribe(res => {this.menu = res.menu;
        console.log("menu de opciones");
        console.log(this.menu);
        this._CargarScriptsService.carga(["sidebarmenu"]);
      });
  }

  ngOnInit(): void {
    this.menu=this.getMenuAccesos();
  }

/*   ngAfterViewInit() {
    this._CargarScriptsService.carga(["sidebarmenu"]);
  } */

}
