import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanciaService {

  private R = 6371; // Radio de la Tierra en km

  // Fórmula de Haversine
  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const dLat = this.gradosARadianes(lat2 - lat1);
    const dLon = this.gradosARadianes(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.gradosARadianes(lat1)) *
      Math.cos(this.gradosARadianes(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.R * c; // distancia en km
  }

  private gradosARadianes(grados: number): number {
    return grados * Math.PI / 180;
  }
}
