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
          // Pide la ubicacion una vez no es continuo.
          enableHighAccuracy: true,
          // 5segundos de espera, sino error
          timeout: 5000,
          // noutiliza ubicacion cache solicita ubicacion al momento
          maximumAge: 0
        }
      );
    });
  }
}
