import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  @Input() my_modal_title:any;
  @Input() my_modal_content:any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
