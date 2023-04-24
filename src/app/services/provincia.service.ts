import { Injectable } from '@angular/core';
import { IProvincia } from '../models/provinciaModel';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor() { }


  public provincia:IProvincia={
    nombre:'',
    capital:'',
    sInteres:''
  }

  provincias: IProvincia[] = [{
    "nombre": "BuenosAires",
    "capital": "La Plata",
    "sInteres": "V Museo interactivo de la plata con imagenes holograficas de los jugadores."
  }, {
    "nombre": "Chaco",
    "capital": "Resistencia",
    "sInteres": " Predio internacional Herederos del mate, donde se puede realizar torneos con las camisetas de los equipos del mundial. "
  }, {
    "nombre": "Formosa",
    "capital": "Formosa",
    "sInteres": "Gildo Insfrán"
  }, {
    "nombre": "Chubut",
    "capital": "Rawson",
    "sInteres": "Pingüinos"
  }, {
    "nombre": "Entre Ríos",
    "capital": "Paraná",
    "sInteres": "Fito Páez"
  }, {
    "nombre": "Misiones",
    "capital": "Posadas",
    "sInteres": "Cataratas del Iguazú"
  }, {
    "nombre": "La Pampa",
    "capital": "Santa Rosa",
    "sInteres": "Vaquitas"
  }, {
    "nombre": "Salta",
    "capital": "Salta",
    "sInteres": "Plaza 9 de Julio, Iglesa de San Francisco, Virgen de los tres cerritos"
  }, {
    "nombre": "San Luis",
    "capital": "San Luis",
    "sInteres": "Sierras de Merlo"
  }, {
    "nombre": "Jujuy",
    "capital": "San Salvador de Jujuy",
    "sInteres": "Pucará de Tilcara"
  }
  ]

  eliminarUltimaProvincia(): void {
    this.provincias.pop();
  }


  agregarProvincia(provincia:IProvincia): void {
    const provinciaPush:IProvincia={...provincia}
    this.provincias.push(provincia);
  }

  listarProvincias(){
    return this.provincias;
  }
}
