import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoTablasRoutingModule } from './mantenimiento-tablas-routing.module';
import { TablaSistemasComponent } from './tabla-sistemas/tabla-sistemas.component';
import { SharedModule } from '@shared/shared.module';
import { PaginaComponent } from './pagina/pagina.component';


@NgModule({
  declarations: [
    TablaSistemasComponent,
    PaginaComponent
  ],
  imports: [
    CommonModule,
    MantenimientoTablasRoutingModule,
    SharedModule
  ]
})
export class MantenimientoTablasModule { }
