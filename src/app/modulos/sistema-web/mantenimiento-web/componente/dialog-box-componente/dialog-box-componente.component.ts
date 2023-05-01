import { Component, Inject, OnInit, Optional, SecurityContext  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GENERAL_CONST, SERVICIO_URL } from '@data/constantes';
import { IComponente } from '@data/interfaces';
import { AuthService } from '@data/servicios/api/auth.service';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {DomSanitizer, SafeValue} from '@angular/platform-browser';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

@Component({
  selector: 'app-dialog-box-componente',
  templateUrl: './dialog-box-componente.component.html',
  styleUrls: ['./dialog-box-componente.component.css']
})
export class DialogBoxComponenteComponent implements OnInit {

  public myCkeditorConfig:any;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};


  action:string;
  local_data:any;
usuario:any;
listEstadoComponente:any;
  constructor(
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
    private authService: AuthService,
    private _CargarScriptsService:CargarScriptsService,
    public dialogRef: MatDialogRef<DialogBoxComponenteComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IComponente) {


      /* extrayendo datos usuario logeado */

      this.usuario = this.authService.getUser;
      this.listEstadoComponente = this.authService.getParametrosById(GENERAL_CONST.GENERAL.CATALOGO_PARAMETROS.ESTADO_COMPONENTE);

    console.log("Dialog");
    console.log(data);

    console.log("listEstadoComponente");
    console.log(this.listEstadoComponente);

    console.log("Extrayendo un usuario de sesión en dialog");
    console.log(this.usuario);

    this.local_data = {...data};
    this.local_data.IDUSUARIOCREACION = this.usuario.IDUSUARIO;
    this.action = this.local_data.action;

    this.myCkeditorConfig = {
      skin:'moonocolor',
      extraPlugins:'bbcode',
      fileTools_requestHeaders: {
          Authorization: `Bearer ${this.usuario.ACCESS_TOKEN}`
      },
      uploadUrl:
      SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ARCHIVO.NUEVOIMAGEN+"?IDUSUARIO="+this.usuario.IDUSUARIO,
      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserUploadUrl:
      SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ARCHIVO.NUEVODOCUMENTO+"?IDUSUARIO="+this.usuario.IDUSUARIO,
      filebrowserImageUploadUrl:
      SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ARCHIVO.NUEVOIMAGEN+"?IDUSUARIO="+this.usuario.IDUSUARIO
  };

  }

  unwrap(value: SafeValue | null): string {
    return this.sanitizer.sanitize(SecurityContext.HTML, value) || '';
  }


  ngOnInit(): void {
    this._CargarScriptsService.cargaModulos(["footable/js/footable.min","bootstrap-switch/bootstrap-switch.min", "ckeditor/ckeditor","ckeditor/plugins/uploadfile/plugin"]);
  }

  doAction(){
    console.log(this.local_data);
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancelar'});
  }
}
