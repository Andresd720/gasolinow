import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/enviroment';
import { HttpClient } from '@angular/common/http';
import { IndexedDBService } from '../db/indexed-db.service';
import { GasolineraDto } from 'src/app/model/gasolinera-dto';

@Injectable({
  providedIn: 'root',
})
export class MITECOService {
  private url = environment.apiUrl;
  private CACHE_KEY = 'miteco_data';
  private TIMESTAMP_KEY = 'miteco_timestamp';
  private CACHE_HOURS = 6; // refrescar cada 6 horas

  constructor(
    private http: HttpClient,
    private db: IndexedDBService,
  ) {}

   obtenerDatos(): Observable<GasolineraDto[]> {
    return from(Promise.all([
      this.db.leer('gasolineras', this.CACHE_KEY),
      this.db.leer('timestamps', this.TIMESTAMP_KEY),
    ])).pipe(
      switchMap(([cache, timestamp]) => {
        const diffHoras = timestamp
          ? (Date.now() - timestamp) / (1000 * 60 * 60)
          : Number.MAX_VALUE;
  
        if (cache && diffHoras < this.CACHE_HOURS) {
          console.log('Usando CACHE de IndexedDB');
          return of(cache as GasolineraDto[]);
        }
  
        console.log('Llamando a la API de MITECO...');
        return this.http.get<any>(this.url).pipe(
          map(response => response.ListaEESSPrecio.map((e: any) => ({
            id: e.IDEESS,
            nombre: e.Rótulo,
            lat: e.Latitud ? parseFloat(e.Latitud.replace(',', '.')):null,
            lng: e['Longitud (WGS84)'] ? parseFloat(e['Longitud (WGS84)'].replace(',', '.')): null,
            municipio: e.Municipio,
            provincia: e.Provincia,
            gasolina95: e['Precio Gasolina 95 E5'] ?? null,
            gasolina98: e['Precio Gasolina 98 E5'] ?? null,
            gasoleoA: e['Precio Gasoleo A'] ?? null,
          }))),
          tap(async (gasolineras) => {
            await this.db.guardar('gasolineras', this.CACHE_KEY, gasolineras);
            await this.db.guardar('timestamps', this.TIMESTAMP_KEY, Date.now());
          })
        );
      }),
      catchError(err => {
        console.error('Error al cargar precios MITECO', err);
        return of([]); // o throwError(err) según necesidad
      })
    );
  }
}