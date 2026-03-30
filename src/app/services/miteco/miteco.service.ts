import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/enviroment';
import { HttpClient} from '@angular/common/http'
import { IndexedDBService } from '../db/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class MITECOService {

  private url = environment.apiUrl;
  private CACHE_KEY = 'miteco_data';
  private TIMESTAMP_KEY = 'miteco_timestamp';
  private CACHE_HOURS = 6; // refrescar cada 6 horas

  constructor(private http: HttpClient, private db:IndexedDBService){}

  obtenerDatos(): Observable<any> {

    return from(this.db.leer('gasolineras',this.CACHE_KEY)).pipe(
      switchMap(async cache => {

        const timestamp = await this.db.leer('timestamps', this.TIMESTAMP_KEY);

        if (cache && timestamp) {
          const diffHoras = (Date.now() - timestamp) / (1000 * 60 * 60);

          if (diffHoras < this.CACHE_HOURS) {
            console.log('Usando CACHE de IndexedDB');
            return { ListaEESSPrecio: cache };
          }
        }

        console.log('Llamando a la API de MITECO...');
        return null;
      }),
      switchMap(cache => {
        if (cache) return of(cache);

        return this.http.get<any>(this.url).pipe(
          tap(async data => {
            await this.db.guardar('gasolineras', this.CACHE_KEY, data.ListaEESSPrecio);
            await this.db.guardar('timestamps', this.TIMESTAMP_KEY, Date.now());
          })
        );
      })
    );
  }
}