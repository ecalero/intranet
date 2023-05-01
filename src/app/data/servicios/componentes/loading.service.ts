import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStateEmitter: Subject<boolean> = new Subject<boolean>();
  constructor() { }
  get isLoading(): Observable<boolean> {
    return this.loadingStateEmitter.asObservable();
  }

  setLoadingState(isLoading: boolean): void {
    console.log("estoy aqui en loading");
    console.log(isLoading);
    this.loadingStateEmitter.next(isLoading);
  }
}
