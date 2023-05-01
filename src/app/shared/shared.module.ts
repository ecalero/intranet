import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as fromComponentes from './componentes'
//agregando servicios
import { CargarScriptsService } from './servicios/cargar-scripts.service';
import { MorrisJsModule } from 'angular-morris-js';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule } from '@angular/material/dialog'
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CKEditorModule } from 'ckeditor4-angular';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { NgSelect2Module } from 'ng-select2';
import { MatRadioModule } from '@angular/material/radio';


import { AngularEditorModule } from '@kolkov/angular-editor';
import {NgDompurifyModule} from '@tinkoff/ng-dompurify';
//modulo que nos sirve para compartir
@NgModule({
  declarations: [...fromComponentes.componentes],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgDompurifyModule,
    MorrisJsModule,
    NgbModule ,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    CKEditorModule,
    MatSelectModule,
    MatOptionModule,
    NgSelect2Module,
    MatRadioModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularEditorModule,
    NgDompurifyModule,
    MorrisJsModule,
    NgbModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    CKEditorModule,
    MatSelectModule,
    MatOptionModule,
    NgSelect2Module,
    MatRadioModule,
    ...fromComponentes.componentes
  ],
  providers:[
    CargarScriptsService
  ]
})
export class SharedModule { }
