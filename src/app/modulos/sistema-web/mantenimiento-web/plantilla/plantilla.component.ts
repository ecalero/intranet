import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlantilla } from '@data/interfaces';
import { AuthService } from '@data/servicios/api/auth.service';
import { PlantillaService } from '@data/servicios/api/plantilla.service';
import { CargarScriptsService } from '@shared/servicios/cargar-scripts.service';
import { CargarStylesService } from '@shared/servicios/cargar-styles.service';
import { BehaviorSubject } from 'rxjs';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {  NuevoComponent } from '@shared/componentes';
import { FormControl } from '@angular/forms';
import { LoadingService } from '@data/servicios/componentes/loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxPlantillaComponent } from './dialog-box-plantilla/dialog-box-plantilla.component';


declare let $: any;
@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css']
})
export class PlantillaComponent implements OnInit {

  public displayedColumns = ['IDPLANTILLA', 'NOMBRE', 'DESCRIPCION', 'DETALLE', 'ACTUALIZAR', 'ELIMINAR'
];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatTable, {static: true}) tabla1: MatTable<IPlantilla>;
  @ViewChild(MatTable) tabla1: MatTable<any>;
  //modal

  title = 'ng-bootstrap-modal-demo';
  closeResult: string ="";
  modalOptions:NgbModalOptions;
  //fin modal

  columnaPlantilla:any;
  filaPlantilla:any = [];
  usuario:any;

  plantillas: IPlantilla[] = [];
  public dataSource = new MatTableDataSource<IPlantilla>(this.plantillas);



  nombre = new FormControl();
  descripcion = new FormControl();
  plantilla:IPlantilla = {
    IDPLANTILLA: -1,
    NOMBRE: this.nombre.value,
    DESCRIPCION: this.descripcion.value,
  };
  lista:IPlantilla[] = [];
  durationInSeconds = 5;
  constructor(
    private modalService: NgbModal,
    private _CargarScriptsService:CargarScriptsService,
    private _CargarStylesService:CargarStylesService,
    private plantillaService: PlantillaService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private toast: MatSnackBar,
    private paginat: MatPaginatorIntl,
    public dialog: MatDialog
    )
  {
    this.paginat.itemsPerPageLabel = "Plantillas por página";
    this.paginat.nextPageLabel="Siguiente";
    this.paginat.previousPageLabel="Página anterior";


    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }


  openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxPlantillaComponent, {
      width: '650px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Agregar'){
        //this.addRowData(result.data);

        this.nombre.setValue(result.data.NOMBRE);
        this.descripcion.setValue(result.data.DESCRIPCION);

        this.registrarPlantilla();
      }else if(result.event == 'Actualizar'){
        this.updateRowData(result.data);
      }else if(result.event == 'Eliminar'){
        this.deleteRowData(result.data);
      }
    });

  }

  addRowData(row_obj:IPlantilla){
    console.log("agregar....>");
    console.log(row_obj);
    var d = new Date();
    this.dataSource.data.push({
      IDPLANTILLA:row_obj.IDPLANTILLA,
      NOMBRE:row_obj.NOMBRE,
      DESCRIPCION:row_obj.DESCRIPCION
    });
    this.plantillas.push(this.plantilla as IPlantilla);
    this.dataSource.data = this.plantillas;

    this.tabla1.renderRows();

  }
  updateRowData(row_obj:IPlantilla){
    console.log("actualizando");
    console.log(row_obj);

    this.dataSource.data = this.dataSource.data.filter((value:IPlantilla | undefined,key:any)=>{
      if(value){
        if(value.IDPLANTILLA == row_obj.IDPLANTILLA){
          value.NOMBRE = row_obj.NOMBRE;
          value.DESCRIPCION = row_obj.DESCRIPCION;
          this.plantilla=row_obj;
          this.actualizarPlantilla(this.plantilla);
        }
      }

      return true;
    });
  }
  deleteRowData(row_obj:IPlantilla){
    this.eliminarPlantilla(row_obj.IDPLANTILLA);
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.IDPLANTILLA != row_obj.IDPLANTILLA;
    });
  }


  ngOnInit(): void {
    this._CargarScriptsService.cargaModulos(["footable/js/footable.min","bootstrap-switch/bootstrap-switch.min.js"]);
    this._CargarScriptsService.carga(["pages/footable/footable.init"]);
    this._CargarStylesService.cargaModulos(["bootstrap-switch/bootstrap-switch.min","footable/css/footable.bootstrap.min","Magnific-Popup-master/dist/magnific-popup"]);
    this._CargarStylesService.carga(["pages/footable-page","pages/bootstrap-switch"]);

    //llamando servicio columnas
    this.plantillaService.getColumnasPlantilla()
    .subscribe(response => {
      this.columnaPlantilla = response;
      console.log("columnas de la tabla");
      console.log(this.columnaPlantilla);
      this.plantillaService.getFilasPlantilla()
      .subscribe(response => {
        this.filaPlantilla = response;
        this.plantillas = response;
        this.dataSource.data = response as IPlantilla[];
        console.log("filas de la tabla");
        console.log(this.plantillas);

        if (this.filaPlantilla.length > 0) {
          const filas = this.filaPlantilla;
          const columnas = this.columnaPlantilla;
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

  open() {
    const modalRef = this.modalService.open(NuevoComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = '<h1>Edwin</h1> <p>I am your content</p>';
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  agregar() {

/*     this.http.get(`${this.apiBaseUrl}api/v1/predict`, options).subscribe((response: any) => {
      this.sketcherData = response;
      this.loadingService.setLoadingState(false);
    }, error => {
      this.errorMessage = 'There was an error processing your structure. Please modify it and try again.';
      this.loadingService.setLoadingState(false);
    }); */
  }

  async registrarPlantilla(){

    this.plantilla.NOMBRE=this.nombre.value;
    this.plantilla.DESCRIPCION=this.descripcion.value;
    this.loadingService.setLoadingState(true);
    let resp = await this.plantillaService.setPlantilla(this.plantilla)
      .then((res) => {
          this.toast.open(res.mensaje, 'Cerrar', {
            duration: this.durationInSeconds * 1000,
          });
        this.plantilla = res.plantilla;
        this.plantillas.push(this.plantilla as IPlantilla);
        this.dataSource.data = this.plantillas;
        this.tabla1.renderRows();
        this.loadingService.setLoadingState(false);
        return res;
      }, err => {
        console.log(err);
        this.loadingService.setLoadingState(false);
      }
    );
  }

  async actualizarPlantilla(plantillaUpd: IPlantilla){

    this.loadingService.setLoadingState(true);
    let resp = await this.plantillaService.actualizarPlantilla(plantillaUpd)
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

  async eliminarPlantilla(IDPLANTILLA:number){

    this.loadingService.setLoadingState(true);
    let resp = await this.plantillaService.eliminarPlantilla(IDPLANTILLA)
      .then((res) => {
          this.toast.open(res.mensaje, 'Cerrar', {
            duration: this.durationInSeconds * 1000,
          });
        /* this.plantilla = res.plantilla;
        this.plantillas.push(this.plantilla as IPlantilla);
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
