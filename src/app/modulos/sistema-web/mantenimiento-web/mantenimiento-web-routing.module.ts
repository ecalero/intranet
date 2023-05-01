import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteComponent } from './componente/componente.component';
import { PaginaComponent } from './pagina/pagina.component';
import { PlantillaComponent } from './plantilla/plantilla.component';

const routes: Routes = [
  {
    path: 'pagina',
    component: PaginaComponent
  },
  {
    path: 'plantilla',
    component: PlantillaComponent
  },
  {
    path: 'componente',
    component: ComponenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoWebRoutingModule { }
