import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { AccesosComponent } from './accesos/accesos.component';
import { PersonaComponent } from './persona/persona.component';
import { DialogBoxUsuarioComponent } from './usuarios/dialog-box-usuario/dialog-box-usuario.component';
import { DialogBoxRolesComponent } from './usuarios/dialog-box-roles/dialog-box-roles.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    RolesComponent,
    AccesosComponent,
    PersonaComponent,
    DialogBoxUsuarioComponent,
    DialogBoxRolesComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule { }
