import { Component, OnInit, ViewChild } from '@angular/core';
import { GENERAL_CONST } from '@data/constantes';
/*agregando 03092021*/
import { IUsuario } from '@data/interfaces'; //se crea
import { AuthService } from '@data/servicios/api/auth.service';
import { UsuarioService } from '@data/servicios/api/usuario.service'; //se crea
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';
import { BehaviorSubject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { FormControl } from '@angular/forms';
import { LoadingService } from '@data/servicios/componentes/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxUsuarioComponent } from '../usuarios/dialog-box-usuario/dialog-box-usuario.component'; //se crea
import { DialogBoxRolesComponent } from '../usuarios/dialog-box-roles/dialog-box-roles.component';
import Swal from 'sweetalert2';
/* Fin */
declare let $: any;
export interface TipoDocumento {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})


export class PersonaComponent implements OnInit {

/**agregando extraer de tab tablas 19042023*/
listTipoDocumento: any;
listTipoPersona: any;
/* Fin*/

  tipoDocumentos: TipoDocumento[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  

  public displayedColumns = [
    'USUARIO',
    //'CLAVE',
    'SYSACTUALIZACION',
    'SYSCREACION',
    'ESTADO',
    'BAJA',
    'NROINTENTOS',
    'ALIAS',
    //'DESCRIPCION',
    'IDPERSONA',
    'ROLES',
    'ACCIONES'
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatTable, {static: true}) tabla1: MatTable<IUsuario>;
  @ViewChild(MatTable) tabla1: MatTable<any>;
  title = 'ng-bootstrap-modal-demo';
  closeResult: string = "";
  modalOptions: NgbModalOptions;
  //fin modal

  columnaUsuario: any;
  filaUsuario: any = [];
  usuario: any;

  usuarios: IUsuario[] = [];
  public dataSource = new MatTableDataSource<IUsuario>(this.usuarios);


  DOCUMENTO = new FormControl();

  IDUSUARIO = new FormControl();
  USUARIO = new FormControl();
  CLAVE = new FormControl();
  SYSACTUALIZACION = new FormControl();
  SYSCREACION = new FormControl();
  ESTADO = new FormControl();
  BAJA = new FormControl();
  NROINTENTOS = new FormControl();
  ALIAS = new FormControl();
  DESCRIPCION = new FormControl();
  IDPERSONA = new FormControl();
  //AGREGANDO
  TIPODOCUMENTO = new FormControl();
  NRODOCUMENTO = new FormControl();
  TIPO_PERSONA = new FormControl();


  componente: IUsuario = {
    IDUSUARIO: -1,
    USUARIO: this.USUARIO.value,
    CLAVE: this.CLAVE.value,
    SYSACTUALIZACION: this.SYSACTUALIZACION.value,
    SYSCREACION: this.SYSCREACION.value,
    ESTADO: this.ESTADO.value,
    BAJA: this.BAJA.value,
    NROINTENTOS: this.NROINTENTOS.value,
    ALIAS: this.ALIAS.value,
    DESCRIPCION: this.DESCRIPCION.value,
    IDPERSONA: this.IDPERSONA.value,
  };

  lista: IUsuario[] = [];
  durationInSeconds = 5;

  constructor(
    private modalService: NgbModal,
    private _CargarScriptsService: CargarScriptsService,
    private _CargarStylesService: CargarStylesService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toast: MatSnackBar,
    private paginat: MatPaginatorIntl,
    public dialog: MatDialog
  ) { 
    this.paginat.itemsPerPageLabel = "Usuarios por página";
    this.paginat.nextPageLabel = "Siguiente";
    this.paginat.previousPageLabel = "Página anterior";

    /*extrae tipo documento*/
    this.listTipoDocumento = this.authService.getParametrosById(GENERAL_CONST.GENERAL.CATALOGO_PARAMETROS.TIPO_DOCUMENTO);
    this.listTipoPersona = this.authService.getParametrosById(GENERAL_CONST.GENERAL.CATALOGO_PARAMETROS.TIPO_PERSONA);
    console.log("listEstadoComponente");
    console.log(this.listTipoPersona);
    
    /*fin*/

  }


  
  onFocusOutEvent(event: any){
    console.log(event.target.value);
    console.log("iniciamos");
    console.log(this.NRODOCUMENTO.value);
    console.log(this.TIPODOCUMENTO.value);
 }
  
  colorEstado = 'primary';
  public estado: any[] = [];

  cambiarEstado(row_obj: IUsuario) {
    //console.log(this.checked);

    if (this.estado[row_obj.IDUSUARIO].ESTADO === true) {
      console.log("esta activo");
      row_obj.ESTADO = GENERAL_CONST.GENERAL.USUARIO_ESTADO.ACTIVO;
      this.estado[row_obj.IDUSUARIO].NOMBRE = "ACTIVO";
    } else {
      console.log("esta inactivo");
      row_obj.ESTADO = GENERAL_CONST.GENERAL.USUARIO_ESTADO.INACTIVO;
      this.estado[row_obj.IDUSUARIO].NOMBRE = "INACTIVO";
    }

    console.log(this.estado[row_obj.IDUSUARIO]);
    console.log(row_obj);

    this.dataSource.data = this.dataSource.data.filter((value: IUsuario | undefined, key: any) => {
      if (value) {

        if (value.IDUSUARIO == row_obj.IDUSUARIO) {
          value.USUARIO = row_obj.USUARIO;
          value.CLAVE = row_obj.CLAVE;
          value.SYSACTUALIZACION = row_obj.SYSACTUALIZACION;
          value.SYSCREACION = row_obj.SYSCREACION;
          value.ESTADO = row_obj.ESTADO;
          value.BAJA = row_obj.BAJA;
          value.NROINTENTOS = row_obj.NROINTENTOS;
          value.ALIAS = row_obj.ALIAS;
          value.DESCRIPCION = row_obj.DESCRIPCION;
          value.IDPERSONA = row_obj.IDPERSONA;
          this.usuario = row_obj;
          this.actualizarUsuario(value);
          console.log("lo que se envia");
          console.log(value);
        }
      }
      return true;
    });

  }

  colorBaja = 'primary';
  public baja: any[] = [];
  cambiarBaja(row_obj: IUsuario) {
    //console.log(this.checked);

    if (this.baja[row_obj.IDUSUARIO].ESTADO === true) {
      console.log("esta activo");
      row_obj.BAJA = GENERAL_CONST.GENERAL.USUARIO_ESTADO.ACTIVO;
      this.baja[row_obj.IDUSUARIO].NOMBRE = "ACTIVO";
    } else {
      console.log("esta inactivo");
      row_obj.BAJA = GENERAL_CONST.GENERAL.USUARIO_ESTADO.INACTIVO;
      this.baja[row_obj.IDUSUARIO].NOMBRE = "INACTIVO";
    }

    console.log(this.baja[row_obj.IDUSUARIO]);
    console.log(row_obj);

    this.dataSource.data = this.dataSource.data.filter((value: IUsuario | undefined, key: any) => {
      if (value) {
        if (value.IDUSUARIO == row_obj.IDUSUARIO) {
          value.USUARIO = row_obj.USUARIO;
          value.CLAVE = row_obj.CLAVE;
          value.SYSACTUALIZACION = row_obj.SYSACTUALIZACION;
          value.SYSCREACION = row_obj.SYSCREACION;
          value.ESTADO = row_obj.ESTADO;
          value.BAJA = row_obj.BAJA;
          value.NROINTENTOS = row_obj.NROINTENTOS;
          value.ALIAS = row_obj.ALIAS;
          value.DESCRIPCION = row_obj.DESCRIPCION;
          value.IDPERSONA = row_obj.IDPERSONA;
          this.usuario = row_obj;
          this.actualizarUsuario(value);
          console.log("lo que se envia");
          console.log(this.usuario);
        }
      }
      return true;
    });

  }



  redirectToDetails(id: any) {
    console.log(id);
  }

  resetearClave(obj: any) {

    console.log("--------->actualizar usuario clave");
    console.log(obj);

    this.usuario = obj;
    this.resetearClaveUsuario(obj);

  }

  openDialogRoles(obj: any) {
    const dialogRef = this.dialog.open(DialogBoxRolesComponent, {
      width: '900px',
      data: obj
    });

    console.log("--------->roles");
    console.log(obj);


    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Agregar') {
        //this.addRowData(result.data);

        this.IDUSUARIO.setValue(result.data.IDUSUARIO);
        this.USUARIO.setValue(result.data.USUARIO);
        this.CLAVE.setValue(result.data.CLAVE);
        this.SYSACTUALIZACION.setValue(result.data.SYSACTUALIZACION);
        this.SYSCREACION.setValue(result.data.SYSCREACION);
        this.ESTADO.setValue(result.data.ESTADO);
        this.BAJA.setValue(result.data.BAJA);
        this.NROINTENTOS.setValue(result.data.NROINTENTOS);
        this.ALIAS.setValue(result.data.ALIAS);
        this.DESCRIPCION.setValue(result.data.DESCRIPCION);
        this.IDPERSONA.setValue(result.data.IDPERSONA);

        this.registrarUsuario();
      } else if (result.event == 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event == 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });

  }


  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxUsuarioComponent, {
      width: '900px',
      data: obj
    });



    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Agregar') {
        //this.addRowData(result.data);

        this.IDUSUARIO.setValue(result.data.IDUSUARIO);
        this.USUARIO.setValue(result.data.USUARIO);
        this.CLAVE.setValue(result.data.CLAVE);
        this.SYSACTUALIZACION.setValue(result.data.SYSACTUALIZACION);
        this.SYSCREACION.setValue(result.data.SYSCREACION);
        this.ESTADO.setValue(result.data.ESTADO);
        this.BAJA.setValue(result.data.BAJA);
        this.NROINTENTOS.setValue(result.data.NROINTENTOS);
        this.ALIAS.setValue(result.data.ALIAS);
        this.DESCRIPCION.setValue(result.data.DESCRIPCION);
        this.IDPERSONA.setValue(result.data.IDPERSONA);

        this.registrarUsuario();
      } else if (result.event == 'Actualizar') {
        this.updateRowData(result.data);
      } else if (result.event == 'Eliminar') {
        this.deleteRowData(result.data);
      }
    });

  }

  addRowData(row_obj: IUsuario) {
    console.log("agregar....>");
    console.log(row_obj);
    var d = new Date();
    this.dataSource.data.push({
      IDUSUARIO: row_obj.IDUSUARIO,
      USUARIO: row_obj.USUARIO,
      CLAVE: row_obj.CLAVE,
      SYSACTUALIZACION: row_obj.SYSACTUALIZACION,
      SYSCREACION: row_obj.SYSCREACION,
      ESTADO: row_obj.ESTADO,
      BAJA: row_obj.BAJA,
      NROINTENTOS: row_obj.NROINTENTOS,
      ALIAS: row_obj.ALIAS,
      DESCRIPCION: row_obj.DESCRIPCION,
      IDPERSONA: row_obj.IDPERSONA
    });
    this.usuarios.push(this.usuario as IUsuario);
    this.dataSource.data = this.usuarios;
    this.tabla1.renderRows();
  }
  updateRowData(row_obj: IUsuario) {
    console.log("actualizando");
    console.log(row_obj);

    this.dataSource.data = this.dataSource.data.filter((value: IUsuario | undefined, key: any) => {
      if (value) {
        if (value.IDUSUARIO == row_obj.IDUSUARIO) {
          value.USUARIO = row_obj.USUARIO;
          value.CLAVE = row_obj.CLAVE;
          value.SYSACTUALIZACION = row_obj.SYSACTUALIZACION;
          value.SYSCREACION = row_obj.SYSCREACION;
          value.ESTADO = row_obj.ESTADO;
          value.BAJA = row_obj.BAJA;
          value.NROINTENTOS = row_obj.NROINTENTOS;
          value.ALIAS = row_obj.ALIAS;
          value.DESCRIPCION = row_obj.DESCRIPCION;
          value.IDPERSONA = row_obj.IDPERSONA;
          this.usuario = row_obj;
          this.actualizarUsuario(this.usuario);
        }
      }
      return true;
    });
  }
  deleteRowData(row_obj: IUsuario) {
    this.eliminarUsuario(row_obj.IDUSUARIO);
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.IDUSUARIO != row_obj.IDUSUARIO;
    });
  }


  ngOnInit(): void {

    


    this._CargarScriptsService.cargaModulos(["footable/js/footable.min", "bootstrap-switch/bootstrap-switch.min", "ckeditor/ckeditor", "select2/dist/js/select2.min"]);
    this._CargarScriptsService.carga(["pages/footable/footable.init"]);
    this._CargarStylesService.cargaModulos(["select2/dist/css/select2.min", "bootstrap-switch/bootstrap-switch.min", "footable/css/footable.bootstrap.min", "Magnific-Popup-master/dist/magnific-popup"]);
    this._CargarStylesService.carga(["pages/footable-page", "pages/bootstrap-switch"]);

    //llamando servicio columnas
    this.usuarioService.getColumnasUsuario()
      .subscribe(response => {

        this.columnaUsuario = response;
        console.log("columnas de la tabla");
        console.log(this.columnaUsuario);
        this.usuarioService.getFilasUsuario()
          .subscribe(response => {
            this.filaUsuario = response;
            this.usuarios = response;
            this.dataSource.data = response as IUsuario[];
            console.log("filas de la tabla");
            console.log(this.usuarios);
            //asigan estados en la tabla
            for (let usuario of this.usuarios) {
              //asignar valor ESTADO
              if (usuario.ESTADO === GENERAL_CONST.GENERAL.USUARIO_ESTADO.ACTIVO) {
                this.estado[usuario.IDUSUARIO] = { ESTADO: true, NOMBRE: "ACTIVO" };
              } else {
                this.estado[usuario.IDUSUARIO] = { ESTADO: false, NOMBRE: "INACTIVO" };
              }
              //asignar valor baja
              if (usuario.BAJA === GENERAL_CONST.GENERAL.USUARIO_ESTADO.ACTIVO) {
                this.baja[usuario.IDUSUARIO] = { ESTADO: true, NOMBRE: "BAJA" };
              } else {
                this.baja[usuario.IDUSUARIO] = { ESTADO: false, NOMBRE: "ALTA" };
              }
            }

            if (this.filaUsuario.length > 0) {
              const filas = this.filaUsuario;
              const columnas = this.columnaUsuario;
              $(document).ready(function () {
                console.log("ready!");
                $('#demo-foo-accordion2').footable().on('footable_row_expanded', function (e: any) {
                  $('#demo-foo-accordion2 tbody tr.footable-detail-show').not(e.row).each(function () {
                    //$('#demo-foo-accordion').data('footable').toggleDetail(this);
                  });
                });
              });
            }
          });
      });


  }

  /*   open(content:any) {
      this.modalService.open(content, this.modalOptions).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } */



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  async registrarUsuario() {

    this.usuario.IDUSUARIO = this.IDUSUARIO.value;
    this.usuario.USUARIO = this.USUARIO.value;
    this.usuario.CLAVE = this.CLAVE.value;
    this.usuario.SYSACTUALIZACION = this.SYSACTUALIZACION.value;
    this.usuario.SYSCREACION = this.SYSCREACION.value;
    this.usuario.ESTADO = this.ESTADO.value;
    this.usuario.BAJA = this.BAJA.value;
    this.usuario.NROINTENTOS = this.NROINTENTOS.value;
    this.usuario.ALIAS = this.ALIAS.value;
    this.usuario.DESCRIPCION = this.DESCRIPCION.value;
    this.usuario.IDPERSONA = this.IDPERSONA.value;


    this.loadingService.setLoadingState(true);
    let resp = await this.usuarioService.setUsuario(this.usuario)
      .then((res) => {
        this.toast.open(res.mensaje, 'Cerrar', {
          duration: this.durationInSeconds * 1000,
        });
        this.usuario = res.usuario;
        this.usuarios.push(this.usuario as IUsuario);
        this.dataSource.data = this.usuarios;
        this.tabla1.renderRows();
        this.loadingService.setLoadingState(false);
        return res;
      }, err => {
        console.log(err);
        this.loadingService.setLoadingState(false);
      }
      );
  }

  async actualizarUsuario(usuarioUpd: IUsuario) {

    this.loadingService.setLoadingState(true);
    let resp = await this.usuarioService.actualizarUsuario(usuarioUpd)
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

  async resetearClaveUsuario(usuarioUpd: IUsuario) {


      Swal.fire({
        title: 'REINICIAR PASSWORD',
        text: 'Si se continúa, la contraseña del Usuario será cambiada al valor por defecto. ¿Desea continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> SI',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i> NO'


      }).then((result) => {



        if (result.value) {
          this.loadingService.setLoadingState(true);
          let resp =  this.usuarioService.resetearClaveUsuario(usuarioUpd)
            .then((res) => {
              this.toast.open(res.mensaje, 'Cerrar', {
                duration: this.durationInSeconds * 1000,
              });
              /*
               */
              this.loadingService.setLoadingState(false);

          Swal.fire(
            'Reseteado!',
            res.mensaje,
            'success'
          )
              return res;
            }, err => {
              console.log(err);
              this.loadingService.setLoadingState(false);
            }
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Confirmar con el usuario el reinicio',
            'error'
          )
        }
      })


  }

  async eliminarUsuario(IDUSUARIO: number) {

    this.loadingService.setLoadingState(true);
    let resp = await this.usuarioService.eliminarUsuario(IDUSUARIO)
      .then((res) => {
        this.toast.open(res.mensaje, 'Cerrar', {
          duration: this.durationInSeconds * 1000,
        });
        /* this.plantilla = res.plantilla;
        this.plantillas.push(this.plantilla as IUsuario);
        this.dataSource.data = this.plantillas;
        this.tabla1.renderRows(); */
        this.loadingService.setLoadingState(false);
        return res;
      }, err => {
        console.log(err);
        this.loadingService.setLoadingState(false);
      }
      );
  }


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }



  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
