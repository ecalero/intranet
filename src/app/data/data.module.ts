import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//no se carga en APPMODULE porque no siempre se carga
//se van a crear todos los datos en este modulo y se crea las carpetas
//constantes: donde se guardaran todas las constantes 
//interfaces: para crear las clases de las tablas
//esquema: Schema (schema.org) es un vocabulario estructurado de datos que define entidades, acciones y relaciones en Internet (webs, emails, etcétera). 
//servicios/api: aqui se extrae todos los servicios de data del servidor en formato json u otro
//mock: carpeta donde se guarda data en json en duro
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DataModule { }
