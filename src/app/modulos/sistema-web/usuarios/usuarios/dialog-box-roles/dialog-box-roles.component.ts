import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { GENERAL_CONST } from '@data/constantes';
import { IUsuario, IUsuarioRol } from '@data/interfaces';
import { AuthService } from '@data/servicios/api/auth.service';
import { FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { MatTableDataSource } from '@angular/material/table';
import { IRol } from '@data/interfaces/tabla/rol.metadata';
import { UsuariorolService } from '@data/servicios/api/usuariorol.service';
import { LoadingService } from '@data/servicios/componentes/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Component({
  selector: 'app-dialog-box-roles',
  templateUrl: './dialog-box-roles.component.html',
  styleUrls: ['./dialog-box-roles.component.css']
})
export class DialogBoxRolesComponent implements OnInit {

  public exampleData: Array<Select2OptionData>;
  public options: Options;
  public value: string[];

  toppings = new FormControl('');

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  action: string;
  local_data: any;
  usuario: any;
  listEstadoComponente: any;

  public displayedColumns = [
    'NOMBRE',
    'DESCRIPCION',
    'ESTADO',
    'ACCIONES'
  ];


  columnaRol: any;
  filaRol: any = [];


  usuarioroles: IUsuarioRol[] = [];
  public dataSource = new MatTableDataSource<IUsuarioRol>(this.usuarioroles);
  lista: IUsuarioRol[] = [];
  durationInSeconds = 5;
  constructor(private authService: AuthService,
    private usuariorolService: UsuariorolService,
    private loadingService: LoadingService,
    private toast: MatSnackBar,
    private paginat: MatPaginatorIntl,
    public dialogRef: MatDialogRef<DialogBoxRolesComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IUsuarioRol) {

    this.paginat.itemsPerPageLabel = "Roles por página";
    this.paginat.nextPageLabel = "Siguiente";
    this.paginat.previousPageLabel = "Página anterior";

    this.usuario = this.authService.getUser;
    this.listEstadoComponente = this.authService.getParametrosById(GENERAL_CONST.GENERAL.CATALOGO_PARAMETROS.ESTADO_COMPONENTE);

    console.log("---->>>>>>>>>>>>dato enviado del componente usuario");
    console.log(data);

    console.log("listEstadoComponente");
    console.log(this.listEstadoComponente);

    console.log("Extrayendo un usuario de sesión en dialog");
    console.log(this.usuario);

    this.local_data = { ...data };
    this.local_data.IDUSUARIOCREACION = this.usuario.IDUSUARIO;
    this.action = this.local_data.action;
     }
     colorEstado = 'primary';
     public estado: any[] = [];
     ngOnInit(): void {

      /* extraer los datos sacados de usuario componente*/

      /* extreae roles */
    //llamando servicio columnas
    this.usuariorolService.getColumnasUsuarioRolByIdUsuario(this.data)
    .subscribe(response => {
      this.columnaRol = response;
      console.log("columnas de la tabla");
      console.log(this.columnaRol);
      this.usuariorolService.getFilasUsuarioRolByIdUsuario(this.data)
        .subscribe(response => {
          this.filaRol = response;
          this.usuarioroles = response;
          this.dataSource.data = response as IUsuarioRol[];
          console.log("filas de roles");
          console.log(this.usuarioroles);
          //asigan estados en la tabla
          for (let rol of this.usuarioroles) {
            //asignar valor ESTADO
            if (rol.ESTADO === GENERAL_CONST.GENERAL.ROL_ESTADO.ACTIVO) {
              this.estado[rol.IDROL] = { ESTADO: true, NOMBRE: "ACTIVO" };
            } else {
              this.estado[rol.IDROL] = { ESTADO: false, NOMBRE: "INACTIVO" };
            }

          }

        });
    });
    /*fin extre roles*/


    }

    doAction() {
      console.log(this.local_data);
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }

    closeDialog() {
      this.dialogRef.close({ event: 'Cancelar' });
    }



  cambiarEstado(row_obj: IUsuarioRol) {
    //console.log(this.checked);

    if (this.estado[row_obj.IDROL].ESTADO === true) {
      console.log("esta activo");
      row_obj.ESTADO = GENERAL_CONST.GENERAL.USUARIO_ESTADO.ACTIVO;
      this.estado[row_obj.IDROL].NOMBRE = "ACTIVO";
    } else {
      console.log("esta inactivo");
      row_obj.ESTADO = GENERAL_CONST.GENERAL.USUARIO_ESTADO.INACTIVO;
      this.estado[row_obj.IDROL].NOMBRE = "INACTIVO";
    }

    console.log(this.estado[row_obj.IDROL]);
    console.log(row_obj);

    this.dataSource.data = this.dataSource.data.filter((value: IUsuarioRol | undefined, key: any) => {
      if (value) {

        if (value.IDROL == row_obj.IDROL) {
          value.IDUSUARIO = this.data.IDUSUARIO;
          value.ESTADO = row_obj.ESTADO;
          this.usuario = row_obj;
          this.actualizarUsuarioRol(value);
          console.log("lo que se envia");
          console.log(value);
        }
      }
      return true;
    });

  }

  async actualizarUsuarioRol(usuarioUpd: IUsuarioRol) {

    this.loadingService.setLoadingState(true);
    let resp = await this.usuariorolService.actualizarUsuarioRol(usuarioUpd)
      .then((res) => {
        this.toast.open(res.mensaje, 'Cerrar', {
          duration: this.durationInSeconds * 1000,
        });
        /*
         */
        this.loadingService.setLoadingState(false);
        return res;
      }, err => {
        console.log(err);
        this.loadingService.setLoadingState(false);
      }
      );
  }






}
