import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'mantenimiento-tablas',
        loadChildren: () =>
          import('@modulos/sistema-web/pedidos/mantenimiento-tablas/mantenimiento-tablas.module').then( (m) => m.MantenimientoTablasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
