import { Component, OnInit, ViewChild, Inject, SecurityContext } from '@angular/core';

/*agregando 03092021*/
import { IComponente } from '@data/interfaces'; //se crea
import { AuthService } from '@data/servicios/api/auth.service';
import { ComponenteService } from '@data/servicios/api/componente.service'; //se crea
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';
import { BehaviorSubject } from 'rxjs';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { FormControl } from '@angular/forms';
import { LoadingService } from '@data/servicios/componentes/loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponenteComponent } from './dialog-box-componente/dialog-box-componente.component'; //se crea

import {DomSanitizer, SafeValue} from '@angular/platform-browser';

/* Fin */
declare let $: any;
@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
  styleUrls: ['./componente.component.css']
})
export class ComponenteComponent implements OnInit {
  public displayedColumns = [
    'IDCOMPONENTE',
    'NOMBRE',
    'TITULO',
    'RESUMEN',
    'CONTENIDO',
    'IDCOMPONENTEPADRE',
    'FECHA_CREACION',
    'IDUSUARIOCREACION',
    'FECHA_ACTUALIZACION',
    'IDUSUARIOACTUALIZACION',
    'ESTADO',
    'DETALLE',
    'ACTUALIZAR',
    'ELIMINAR'
];




  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatTable, {static: true}) tabla1: MatTable<IComponente>;
  @ViewChild(MatTable) tabla1: MatTable<any>;
  //modal

  title = 'ng-bootstrap-modal-demo';
  closeResult: string ="";
  modalOptions:NgbModalOptions;
  //fin modal

  columnaComponente:any;
  filaComponente:any = [];
  usuario:any;

  componentes: IComponente[] = [];
  public dataSource = new MatTableDataSource<IComponente>(this.componentes);



  nombre                 = new FormControl();
  titulo                 = new FormControl();
  resumen                = new FormControl();
  contenido              = new FormControl();
  idcomponentepadre      = new FormControl();
  fecha_creacion         = new FormControl();
  idusuariocreacion      = new FormControl();
  fecha_actualizacion    = new FormControl();
  idusuarioactualizacion = new FormControl();
  estado                 = new FormControl();

  componente:IComponente = {
    IDCOMPONENTE          : -1,
    NOMBRE                : this.nombre.value,
    TITULO                : this.titulo.value,
    RESUMEN               : this.resumen.value,
    CONTENIDO             : this.contenido.value,
    IDCOMPONENTEPADRE     : this.idcomponentepadre.value,
    FECHA_CREACION        : this.fecha_creacion.value,
    IDUSUARIOCREACION     : this.idusuariocreacion.value,
    FECHA_ACTUALIZACION   : this.fecha_actualizacion.value,
    IDUSUARIOACTUALIZACION: this.idusuarioactualizacion.value,
    ESTADO                : this.estado.value,
  };

  lista:IComponente[] = [];
  durationInSeconds = 5;
  constructor(
    private modalService: NgbModal,
    private _CargarScriptsService:CargarScriptsService,
    private _CargarStylesService:CargarStylesService,
    private componenteService: ComponenteService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toast: MatSnackBar,
    private paginat: MatPaginatorIntl,
    public dialog: MatDialog,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer
    )
    {
    this.paginat.itemsPerPageLabel = "Componentes por página";
    this.paginat.nextPageLabel="Siguiente";
    this.paginat.previousPageLabel="Página anterior";
    }

    unwrap(value: SafeValue | null): string {
      return this.sanitizer.sanitize(SecurityContext.HTML, value) || '';
    }

    openDialog(action:any,obj:any) {
      obj.action = action;
      const dialogRef = this.dialog.open(DialogBoxComponenteComponent, {
        width: '900px',
        data:obj
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.event == 'Agregar'){
          //this.addRowData(result.data);


          this.nombre.setValue(result.data.NOMBRE);
          this.titulo.setValue(result.data.TITULO);
          this.resumen.setValue(result.data.RESUMEN);
          this.contenido.setValue(result.data.CONTENIDO);
          this.idcomponentepadre.setValue(result.data.IDCOMPONENTEPADRE);
          this.fecha_creacion.setValue(result.data.FECHA_CREACION);
          this.idusuariocreacion.setValue(result.data.IDUSUARIOCREACION);
          this.fecha_actualizacion.setValue(result.data.FECHA_ACTUALIZACION);
          this.idusuarioactualizacion.setValue(result.data.IDUSUARIOACTUALIZACION);
          this.estado.setValue(result.data.ESTADO);

          this.registrarComponente();
        }else if(result.event == 'Actualizar'){
          this.updateRowData(result.data);
        }else if(result.event == 'Eliminar'){
          this.deleteRowData(result.data);
        }
      });

    }



    addRowData(row_obj:IComponente){
      console.log("agregar....>");
      console.log(row_obj);
      var d = new Date();
      this.dataSource.data.push({
        IDCOMPONENTE          : row_obj.IDCOMPONENTE          ,
        NOMBRE                : row_obj.NOMBRE                ,
        TITULO                : row_obj.TITULO                ,
        RESUMEN               : row_obj.RESUMEN               ,
        CONTENIDO             : row_obj.CONTENIDO             ,
        IDCOMPONENTEPADRE     : row_obj.IDCOMPONENTEPADRE     ,
        FECHA_CREACION        : row_obj.FECHA_CREACION        ,
        IDUSUARIOCREACION     : row_obj.IDUSUARIOCREACION     ,
        FECHA_ACTUALIZACION   : row_obj.FECHA_ACTUALIZACION   ,
        IDUSUARIOACTUALIZACION: row_obj.IDUSUARIOACTUALIZACION,
        ESTADO                : row_obj.ESTADO
      });
      this.componentes.push(this.componente as IComponente);
      this.dataSource.data = this.componentes;

      this.tabla1.renderRows();

    }
    updateRowData(row_obj:IComponente){
      console.log("actualizando");
      console.log(row_obj);

      this.dataSource.data = this.dataSource.data.filter((value:IComponente | undefined,key:any)=>{
        if(value){
          if(value.IDCOMPONENTE == row_obj.IDCOMPONENTE){
            value.NOMBRE                = row_obj.NOMBRE                ;
            value.TITULO                = row_obj.TITULO                ;
            value.RESUMEN               = row_obj.RESUMEN               ;
            value.CONTENIDO             = row_obj.CONTENIDO             ;
            value.IDCOMPONENTEPADRE     = row_obj.IDCOMPONENTEPADRE     ;
            value.FECHA_CREACION        = row_obj.FECHA_CREACION        ;
            value.IDUSUARIOCREACION     = row_obj.IDUSUARIOCREACION     ;
            value.FECHA_ACTUALIZACION   = row_obj.FECHA_ACTUALIZACION   ;
            value.IDUSUARIOACTUALIZACION= row_obj.IDUSUARIOACTUALIZACION;
            value.ESTADO                = row_obj.ESTADO               ;
            this.componente=row_obj;
            this.actualizarComponente(this.componente);
          }
        }
        return true;
      });
    }
    deleteRowData(row_obj:IComponente){
      this.eliminarComponente(row_obj.IDCOMPONENTE);
      this.dataSource.data = this.dataSource.data.filter((value,key)=>{
        return value.IDCOMPONENTE != row_obj.IDCOMPONENTE;
      });
    }


    ngOnInit(): void {
      this._CargarScriptsService.cargaModulos(["footable/js/footable.min","bootstrap-switch/bootstrap-switch.min", "ckeditor/ckeditor"]);
      this._CargarScriptsService.carga(["pages/footable/footable.init"]);
      this._CargarStylesService.cargaModulos(["bootstrap-switch/bootstrap-switch.min","footable/css/footable.bootstrap.min","Magnific-Popup-master/dist/magnific-popup"]);
      this._CargarStylesService.carga(["pages/footable-page","pages/bootstrap-switch"]);

      //llamando servicio columnas
      this.componenteService.getColumnasComponente()
      .subscribe(response => {
        this.columnaComponente = response;
        console.log("columnas de la tabla");
        console.log(this.columnaComponente);
        this.componenteService.getFilasComponente()
        .subscribe(response => {
          this.filaComponente = response;
          this.componentes = response;
          this.dataSource.data = response as IComponente[];
          console.log("filas de la tabla");
          console.log(this.componentes);

          if (this.filaComponente.length > 0) {
            const filas = this.filaComponente;
            const columnas = this.columnaComponente;
            $( document ).ready(function() {
              console.log( "ready!" );
                $('#demo-foo-accordion2').footable().on('footable_row_expanded', function(e:any) {
                  $('#demo-foo-accordion2 tbody tr.footable-detail-show').not(e.row).each(function() {
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
        return  `with: ${reason}`;
      }
    }


    async registrarComponente(){

      this.componente.NOMBRE = this.nombre.value;
      this.componente.TITULO = this.titulo.value;
      this.componente.RESUMEN = this.resumen.value;
      this.componente.CONTENIDO = this.contenido.value;
      this.componente.IDCOMPONENTEPADRE = this.idcomponentepadre.value;
      this.componente.FECHA_CREACION = this.fecha_creacion.value;
      this.componente.IDUSUARIOCREACION = this.idusuariocreacion.value;
      this.componente.FECHA_ACTUALIZACION = this.fecha_actualizacion.value;
      this.componente.IDUSUARIOACTUALIZACION = this.idusuarioactualizacion.value;
      this.componente.ESTADO = this.estado.value;

      this.loadingService.setLoadingState(true);
      let resp = await this.componenteService.setComponente(this.componente)
        .then((res) => {
            this.toast.open(res.mensaje, 'Cerrar', {
              duration: this.durationInSeconds * 1000,
            });
          this.componente = res.componente;
          this.componentes.push(this.componente as IComponente);
          this.dataSource.data = this.componentes;
          this.tabla1.renderRows();
          this.loadingService.setLoadingState(false);
          return res;
        }, err => {
          console.log(err);
          this.loadingService.setLoadingState(false);
        }
      );
    }

    async actualizarComponente(componenteUpd : IComponente){

      this.loadingService.setLoadingState(true);
      let resp = await this.componenteService.actualizarComponente(componenteUpd)
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

    async eliminarComponente(IDCOMPONENTE:number){

      this.loadingService.setLoadingState(true);
      let resp = await this.componenteService.eliminarComponente(IDCOMPONENTE)
        .then((res) => {
            this.toast.open(res.mensaje, 'Cerrar', {
              duration: this.durationInSeconds * 1000,
            });
          /* this.plantilla = res.plantilla;
          this.plantillas.push(this.plantilla as IComponente);
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
