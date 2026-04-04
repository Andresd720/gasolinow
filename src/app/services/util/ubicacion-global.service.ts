import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PosicionGpsCoord } from 'src/app/model/posicion-gps';

@Injectable({
  providedIn: 'root'
})
export class UbicacionGlobalService {

  private coordsSubject = new BehaviorSubject<PosicionGpsCoord | null>(null);

  coords$: Observable<PosicionGpsCoord | null> = this.coordsSubject.asObservable();

  setCoords(coords: PosicionGpsCoord): void {
    this.coordsSubject.next(coords);
    console.log("desde globalservices", this.coords$);
  }

  
  

}
