import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { IntranetComponent } from './layout/intranet/intranet.component';
import { CabeceraComponent } from './layout/secciones/cabecera/cabecera.component';
import { MenuIzquierdaComponent } from './layout/secciones/menu-izquierda/menu-izquierda.component';
import { PieComponent } from './layout/secciones/pie/pie.component';
import { CuerpoComponent } from './layout/secciones/cuerpo/cuerpo.component';
import { MenuNavComponent } from './layout/secciones/menu-izquierda/menu-nav/menu-nav.component';
import { InternoComponent } from './modulos/inicio/interno/interno.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MuninuevochimboteModule } from '@layout/muninuevochimbote/muninuevochimbote.module';



@NgModule({
  declarations: [
    AppComponent,
    IntranetComponent,
    CabeceraComponent,
    CuerpoComponent,
    MenuIzquierdaComponent,
    PieComponent,
    MenuNavComponent,
    InternoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CoreModule, //agregado 1
    SharedModule,
    BrowserAnimationsModule,
    MuninuevochimboteModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
