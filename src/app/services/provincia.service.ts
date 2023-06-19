import { Injectable } from '@angular/core';
import { IProvincia } from '../models/provinciaModel';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ProvinciaService {

  API_URI = 'http://localhost:3000/province';
  provincias: IProvincia[] = [];

  constructor(private http: HttpClient) {
    // this.provincias = [{
    //   "id": 1,
    //   "nombre": "BuenosAires",
    //   "capital": "La Plata",
    //   "sInteres": "V Museo interactivo de la plata con imagenes holograficas de los jugadores."
    // }, {
    //   "id": 2,
    //   "nombre": "Chaco",
    //   "capital": "Resistencia",
    //   "sInteres": " Predio internacional Herederos del mate, donde se puede realizar torneos con las camisetas de los equipos del mundial. "
    // }, {
    //   "id": 3,
    //   "nombre": "Formosa",
    //   "capital": "Formosa",
    //   "sInteres": "Dulce de caña"
    // }, {
    //   "id": 4,
    //   "nombre": "Chubut",
    //   "capital": "Rawson",
    //   "sInteres": "Pingüinos"
    // }, {
    //   "id": 5,
    //   "nombre": "Entre Ríos",
    //   "capital": "Paraná",
    //   "sInteres": "Fito Páez"
    // }, {
    //   "id": 6,
    //   "nombre": "Misiones",
    //   "capital": "Posadas",
    //   "sInteres": "Cataratas del Iguazú"
    // }, {
    //   "id": 7,
    //   "nombre": "La Pampa",
    //   "capital": "Santa Rosa",
    //   "sInteres": "Vaquitas"
    // }, {
    //   "id": 8,
    //   "nombre": "Salta",
    //   "capital": "Salta",
    //   "sInteres": "Plaza 9 de Julio, Iglesa de San Francisco, Virgen de los tres cerritos"
    // }, {
    //   "id": 9,
    //   "nombre": "San Luis",
    //   "capital": "San Luis",
    //   "sInteres": "Sierras de Merlo"
    // }, {
    //   "id": 10,
    //   "nombre": "Jujuy",
    //   "capital": "San Salvador de Jujuy",
    //   "sInteres": "Pucará de Tilcara"
    // }
    // ]
  }

  listProvincias() {
    return this.http.get(`${this.API_URI}/`);
  }

  createProvincia(provinciasCreate: IProvincia) {
    return this.http.post(`${this.API_URI}/`, provinciasCreate)
  }

  updateProvincia(id: number, actualizaProvincia: IProvincia) {
    return this.http.put(`${this.API_URI}/${id}`, actualizaProvincia);
  }

  deleteProvincia(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`)
  }

}
