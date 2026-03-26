import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
   zoom = 12;

  center: google.maps.LatLngLiteral = {
    lat: 40.4168, // Madrid
    lng: -3.7038
  };

}
