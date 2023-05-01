import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    SharedModule
  ]
})
export class PedidosModule { }
