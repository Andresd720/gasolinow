import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
 private dbPromise: Promise<IDBPDatabase>;

  constructor() { 
    this.dbPromise=this.initDB();
  }
    // iniciamos la base, si no esta creada, la creamos y le colocamos nombre
    private async initDB() {
    return await openDB('miteco-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('gasolineras')) {
          db.createObjectStore('gasolineras');
        }
        if (!db.objectStoreNames.contains('timestamps')) {
          db.createObjectStore('timestamps');
        }
      }
    });
  }
//  Guardamos o actualizamos la data Store nombre de la "Tabla", Key La clave de como se guarda
// Value el valor guardado, puede ser array, objetos...
    async guardar(store: string, key: string, value: any) {
    const db = await this.dbPromise;
    await db.put(store, value, key);
  }
// Leemos el valor de la base de datos. Devuelve los valores guaradados en Store y Key si no hay datos undefined
// No puede devolver undifined Ahi se debe llamar a la Api miteco y hay error lanzarlo alli.
    async leer(store: string, key: string) {
    const db = await this.dbPromise;
    return await db.get(store, key);
  }
//  Borramos el valor asociado a Store y key.
    async borrar(store: string, key: string) {
    const db = await this.dbPromise;
    await db.delete(store, key);
  }
}




