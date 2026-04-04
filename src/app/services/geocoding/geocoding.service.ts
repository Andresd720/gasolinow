import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PosicionGpsCoord, GoogleGeocodeResponse } from 'src/app/model/posicion-gps';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {


   constructor(private http: HttpClient) {}
   private apiKey ='AIzaSyACCuPCmmAiQ9xbxwkhNrcgRYoMWVnLGXs';
   private baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  buscarDireccion(direccion: string): Observable<PosicionGpsCoord> {
    const url = `${this.baseUrl}?address=${encodeURIComponent(direccion)}&key=${this.apiKey}`;

    return this.http.get<GoogleGeocodeResponse>(url).pipe(
      map(res => {
        if (!res.results || res.results.length === 0) {
          throw new Error('No se encontró la dirección');
        }

        return res.results[0].geometry.location;
      })
    );
  }
}
