export interface GasolineraDto {
  id: string;
  nombre: string;
  lat: number;
  lng: number;
  municipio: string;
  provincia: string;
  gasolina95: string | null;
  gasolina98: string | null;
  gasoleoA: string | null;

}
