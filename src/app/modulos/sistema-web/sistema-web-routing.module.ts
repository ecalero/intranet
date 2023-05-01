import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        loadChildren: () =>
          import('@modulos/sistema-web/usuarios/usuarios.module').then( (m) => m.UsuariosModule)
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('@modulos/sistema-web/pedidos/pedidos.module').then( (m) => m.PedidosModule)
      },
      {
        path: 'mantenimiento-tablas',
        loadChildren: () =>
          import('@modulos/sistema-web/mantenimiento-web/mantenimiento-web.module').then( (m) => m.MantenimientoWebModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaWebRoutingModule { }
