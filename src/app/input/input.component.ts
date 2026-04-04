import { Component, OnInit } from '@angular/core';
import { MITECOService } from '../services/miteco/miteco.service';
import { GpsService } from '../services/gps/gps.service';
import { UbicacionGlobalService } from '../services/util/ubicacion-global.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  constructor(private gps:GpsService, private ubicacion:UbicacionGlobalService
  ) {}

  solicitarGps(){
    //llamamos al servicio gps, nos devuelve cordenadas que encapsulamos en la var pos.
    this.gps.obtenerPosicion().subscribe({
      next: pos => {
        //llamamos al servicio global y le paso la informacion.
        this.ubicacion.setCoords(pos);
      },
      error: error => {
        console.warn('Error obteniendo GPS:', error);
      }
    });
  }

}
