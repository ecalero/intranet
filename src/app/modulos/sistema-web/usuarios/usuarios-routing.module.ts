import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesosComponent } from './accesos/accesos.component';
import { PersonaComponent } from './persona/persona.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'accesos',
    component: AccesosComponent
  },
  {
    path: 'persona',
    component: PersonaComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
