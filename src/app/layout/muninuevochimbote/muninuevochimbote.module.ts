import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuninuevochimboteRoutingModule } from './muninuevochimbote-routing.module';
import { InicioComponent } from './plantilla/inicio/inicio.component';
import { NoticiaComponent } from './plantilla/noticia/noticia.component';
import { CabeceraComponent } from './componente/cabecera/cabecera.component';
import { PieComponent } from './componente/pie/pie.component';


@NgModule({
  declarations: [
    InicioComponent,
    NoticiaComponent,
    CabeceraComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    MuninuevochimboteRoutingModule
  ]
})
export class MuninuevochimboteModule { }
