import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoWebRoutingModule } from './mantenimiento-web-routing.module';
import { SharedModule } from '@shared/shared.module';
import { PaginaComponent } from './pagina/pagina.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { DialogBoxPlantillaComponent } from './plantilla/dialog-box-plantilla/dialog-box-plantilla.component';
import { ComponenteComponent } from './componente/componente.component';
import { DialogBoxComponenteComponent } from './componente/dialog-box-componente/dialog-box-componente.component';


@NgModule({
  declarations: [
    PaginaComponent,
    PlantillaComponent,
    DialogBoxPlantillaComponent,
    ComponenteComponent,
    DialogBoxComponenteComponent],
  imports: [
    CommonModule,
    MantenimientoWebRoutingModule,
    SharedModule
  ]
})
export class MantenimientoWebModule { }
