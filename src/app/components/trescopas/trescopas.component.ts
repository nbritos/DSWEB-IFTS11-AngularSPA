import { Component, OnInit } from '@angular/core';
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

  provinciaNueva: IProvincia = {}

  constructor(private provinciaService: ProvinciaService) {
    this.provincias = provinciaService.listarProvincias();
    console.log(this.provincias);
  }

  eliminarUltimaProvincia() {
    this.provinciaService.eliminarUltimaProvincia();
  }

  agregarProvincia(): void {
    this.provincias.push(this.provinciaNueva);
    console.log(this.provincias);
    this.provinciaService.agregarProvincia(this.provincias);
  }


  limpiarProvincia(): void {
    this.provinciaNueva.nombre = '',
      this.provinciaNueva.capital = '';
    this.provinciaNueva.sInteres = '';
  }

  limpiarNombre(): void {
    this.provinciaNueva.nombre = '';
  }

  limpiarCapital(): void {
    this.provinciaNueva.capital = '';
  }

  limpiarSInteres(): void {
    this.provinciaNueva.sInteres = '';
  }
}
