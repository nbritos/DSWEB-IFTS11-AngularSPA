import { Component, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IProvincia } from 'src/app/models/provinciaModel';
import { ProvinciaService } from 'src/app/services/provincia.service';



@Component({
  selector: 'app-trescopas',
  templateUrl: './trescopas.component.html',
  styleUrls: ['./trescopas.component.css']
})

export class TrescopasComponent {

  titulo: string = "tresCopas";
  provincias: IProvincia[] = []

  nombre: string = '';
  capital: string = '';
  interes: string = '';



  provinciaNueva: IProvincia = {};


  constructor(private provinciaService: ProvinciaService) {
    this.provincias = provinciaService.listarProvincias();
    console.log(this.provincias);
  }

  eliminarUltimaProvincia() {
    this.provinciaService.eliminarUltimaProvincia();
  }

  // emitirProvincia(): void {
  //   this.provinciaPush.nombre=this.provinciaNueva.nombre;
  //   this.provinciaPush.capital=this.provinciaNueva.capital;
  //   this.provinciaPush.sInteres=this.provinciaNueva.sInteres;
  // }

  agregarProvincia(): void {
    this.provinciaService.agregarProvincia(this.provinciaNueva);
    console.log(this.provincias);
    this.provinciaNueva={};
  }

}
