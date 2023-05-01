import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPlantilla } from '@data/interfaces';
@Component({
  selector: 'app-dialog-box-plantilla',
  templateUrl: './dialog-box-plantilla.component.html',
  styleUrls: ['./dialog-box-plantilla.component.css']
})
export class DialogBoxPlantillaComponent implements OnInit {

  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxPlantillaComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IPlantilla) {
      console.log("Dialog");
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  ngOnInit(): void {
  }

  doAction(){
    console.log(this.local_data);
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancelar'});
  }

}
