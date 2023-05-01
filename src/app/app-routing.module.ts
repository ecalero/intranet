import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { IntranetComponent } from './layout/intranet/intranet.component';
import { InternoComponent } from '@modulos/inicio/interno/interno.component';
import { MuninuevochimboteModule } from '@layout/muninuevochimbote/muninuevochimbote.module';
const routes: Routes = [
  {
    path: '',
    redirectTo:'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'web',
        loadChildren: () =>
        import('@layout/muninuevochimbote/muninuevochimbote.module').then( (m) => m.MuninuevochimboteModule)
  },
  {
    path: 'intranet',
    component: IntranetComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: InternoComponent,
      },
      {
        path: 'web',
        loadChildren: () =>
          import('@modulos/sistema-web/sistema-web.module').then( (m) => m.SistemaWebModule)
      }
    ]
  },
  {
    path: 'auth',
        loadChildren: () =>
          import('@core/auth/auth.module').then( (m) => m.AuthModule)
  },
  {
    path: '**',
    redirectTo:'/auth/login',
    pathMatch: 'full'
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
