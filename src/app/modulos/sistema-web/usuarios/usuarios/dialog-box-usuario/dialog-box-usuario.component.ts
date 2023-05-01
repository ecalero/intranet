import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GENERAL_CONST, SERVICIO_URL } from '@data/constantes';
import { IUsuario } from '@data/interfaces';
import { AuthService } from '@data/servicios/api/auth.service';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';

@Component({
  selector: 'app-dialog-box-usuario',
  templateUrl: './dialog-box-usuario.component.html',
  styleUrls: ['./dialog-box-usuario.component.css']
})
export class DialogBoxUsuarioComponent implements OnInit {
  public myCkeditorConfig: any;
  action: string;
  local_data: any;
  usuario: any;
  listEstadoComponente: any;

  constructor(private authService: AuthService,
    private _CargarScriptsService: CargarScriptsService,
    public dialogRef: MatDialogRef<DialogBoxUsuarioComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IUsuario) {

    this.usuario = this.authService.getUser;
    this.listEstadoComponente = this.authService.getParametrosById(GENERAL_CONST.GENERAL.CATALOGO_PARAMETROS.ESTADO_COMPONENTE);

    console.log("Dialog");
    console.log(data);

    console.log("listEstadoComponente");
    console.log(this.listEstadoComponente);

    console.log("Extrayendo un usuario de sesión en dialog");
    console.log(this.usuario);

    this.local_data = { ...data };
    this.local_data.IDUSUARIOCREACION = this.usuario.IDUSUARIO;
    this.action = this.local_data.action;

    this.myCkeditorConfig = {
      skin: 'moonocolor',
      //extraPlugins:'uploadfile',
      fileTools_requestHeaders: {
        Authorization: `Bearer ${this.usuario.ACCESS_TOKEN}`
      },
      uploadUrl:
        SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ARCHIVO.NUEVOIMAGEN + "?IDUSUARIO=" + this.usuario.IDUSUARIO,
      // Configure your file manager integration. This example uses CKFinder 3 for PHP.
      filebrowserUploadUrl:
        SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ARCHIVO.NUEVODOCUMENTO + "?IDUSUARIO=" + this.usuario.IDUSUARIO,
      filebrowserImageUploadUrl:
        SERVICIO_URL.SLIM4.DOMINIO + SERVICIO_URL.SLIM4.ARCHIVO.NUEVOIMAGEN + "?IDUSUARIO=" + this.usuario.IDUSUARIO
    };

  }



  ngOnInit(): void {
    this._CargarScriptsService.cargaModulos(["footable/js/footable.min", "bootstrap-switch/bootstrap-switch.min", "ckeditor/ckeditor", "ckeditor/plugins/uploadfile/plugin"]);
  }

  doAction() {
    console.log(this.local_data);
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancelar' });
  }

}
