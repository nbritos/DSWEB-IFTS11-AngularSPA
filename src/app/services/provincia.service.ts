import { Injectable } from '@angular/core';
import { IProvincia } from '../models/provinciaModel';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  API_URI = 'http://localhost:3000/provincias';

  provincias: IProvincia[];


  constructor() {
    this.provincias = [{
      "id": 1,
      "nombre": "BuenosAires",
      "capital": "La Plata",
      "sInteres": "V Museo interactivo de la plata con imagenes holograficas de los jugadores."
    }, {
      "id": 2,
      "nombre": "Chaco",
      "capital": "Resistencia",
      "sInteres": " Predio internacional Herederos del mate, donde se puede realizar torneos con las camisetas de los equipos del mundial. "
    }, {
      "id": 3,
      "nombre": "Formosa",
      "capital": "Formosa",
      "sInteres": "Dulce de caña"
    }, {
      "id": 4,
      "nombre": "Chubut",
      "capital": "Rawson",
      "sInteres": "Pingüinos"
    }, {
      "id": 5,
      "nombre": "Entre Ríos",
      "capital": "Paraná",
      "sInteres": "Fito Páez"
    }, {
      "id": 6,
      "nombre": "Misiones",
      "capital": "Posadas",
      "sInteres": "Cataratas del Iguazú"
    }, {
      "id": 7,
      "nombre": "La Pampa",
      "capital": "Santa Rosa",
      "sInteres": "Vaquitas"
    }, {
      "id": 8,
      "nombre": "Salta",
      "capital": "Salta",
      "sInteres": "Plaza 9 de Julio, Iglesa de San Francisco, Virgen de los tres cerritos"
    }, {
      "id": 9,
      "nombre": "San Luis",
      "capital": "San Luis",
      "sInteres": "Sierras de Merlo"
    }, {
      "id": 10,
      "nombre": "Jujuy",
      "capital": "San Salvador de Jujuy",
      "sInteres": "Pucará de Tilcara"
    }
    ]
  }




  listarProvincias() {
    return this.provincias;
  }

  guardarProvincias(provinciasGuardar: IProvincia[]) {
    //Recibe un array de provincias y lo guarda. Sobreescribe el contenido previo.
    this.provincias = provinciasGuardar;
  }

  guardarProvinciasLocal() {
    //Guarda los usuarios del objeto en el LocalStorage
    localStorage.setItem("Provincias", JSON.stringify(this.provincias));
  }

  setToken() {
    localStorage.setItem('token', 'LogInOK');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
  }

}
