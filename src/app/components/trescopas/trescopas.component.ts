import { Component } from '@angular/core';
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

  constructor(public provinciaService: ProvinciaService) {
    this.provincias = provinciaService.listarProvincias();
  }

  provincia: IProvincia = {
    nombre: '',
    capital: '',
    sInteres: '',
  }


  // onSubmit():void {
  //   this.provinciaService.agregarProvincia(this.provincia)
  // }

}
