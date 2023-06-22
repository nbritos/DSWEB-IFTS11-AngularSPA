import { Injectable } from '@angular/core';
import { IProvincia } from '../models/provinciaModel';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class ProvinciaService {

  API_URI = 'http://localhost:3000/province';
  provincias: IProvincia[] = [];


  constructor(private http: HttpClient) {
  }


  listProvincias() {
    //la const y prop headers no van. Estan de prueba hasta resolver verify token.
    const headers = new HttpHeaders({
      'Authorization': 'Bearer <$"token">'
    });
    
    return this.http.get(`${this.API_URI}/`,{headers});
  }

  createProvincia(provinciasCreate: IProvincia) {
    console.log(JSON.stringify(provinciasCreate));
    return this.http.post(`${this.API_URI}/`, provinciasCreate).subscribe(
      (res: any) => {
        console.log('si no existe agrega', res);
      },
      (error: any) => {
        console.error('error al agregar la provincia', error);
      }
    )
  }

  updateProvincia(id: number, provinciasCreate: IProvincia) {
    return this.http.put(`${this.API_URI}/${id}`, provinciasCreate);
  }

  deleteProvincia(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

}
