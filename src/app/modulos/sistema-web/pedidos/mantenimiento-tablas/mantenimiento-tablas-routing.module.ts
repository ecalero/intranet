import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaComponent } from './pagina/pagina.component';
import { TablaSistemasComponent } from './tabla-sistemas/tabla-sistemas.component';

const routes: Routes = [
      {
        path: 'tabla-sistemas',
        component: TablaSistemasComponent
      },
      {
        path: 'pagina',
        component: PaginaComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoTablasRoutingModule { }
