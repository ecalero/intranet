import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@data/servicios/componentes/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading = false;
  constructor(private lodadingService: LoadingService) { }

  ngOnInit(): void {
    this.lodadingService.isLoading.subscribe(isLoading => {
      console.log("componente loading");
      this.isLoading = isLoading;
    });
  }

}
