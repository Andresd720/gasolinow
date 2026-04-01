import { Component, OnInit } from '@angular/core';
import { MITECOService } from '../services/miteco/miteco.service';

@Component({
  selector: 'app-eess',
  templateUrl: './eess.component.html',
  styleUrls: ['./eess.component.css']
})
export class EessComponent implements OnInit {

  constructor(private miteco:MITECOService) {}

  ngOnInit(){ 

    this.miteco.obtenerDatos().subscribe(data =>{
      console.log("datos:" ,data);
    })

    

  }

}
