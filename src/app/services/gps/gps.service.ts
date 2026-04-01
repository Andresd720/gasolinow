import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PosicionGps } from 'src/app/model/posicion-gps';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  obtenerPosicion(): Observable<PosicionGps> {
    return new Observable(observer => {

      if (!navigator.geolocation) {
        observer.error('El navegador no soporta geolocalización');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          observer.complete();
        },
        (err) => {
          observer.error('No se pudo obtener la ubicación: ' + err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  }
}
