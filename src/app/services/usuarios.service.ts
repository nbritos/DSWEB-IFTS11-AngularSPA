import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarioModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3000/user';
  usuarios: Usuario[];

  constructor(private http: HttpClient) { 
    this.usuarios = [{
      "id": "1",
      "nombre": "Pedro",
      "email": "pedro@email.net",
      "password": "123456",
      "rol": "admin"
    }, {
      "id": "2",
      "nombre": "Juan",
      "email": "juan@email.net",
      "password": "123456",
      "rol": "usuario"
    }, {
      "id": "3",
      "nombre": "Hugo",
      "email": "hugo@email.net",
      "password": "123456",
      "rol": "usuario"
    }, {
      "id": "4",
      "nombre": "Carlos",
      "email": "carlos@email.net",
      "password": "123456",
      "rol": "admin"
    }, {
      "id": "5",
      "nombre": "Maria",
      "email": "maria@email.net",
      "password": "123456",
      "rol": "admin"
    }];
  }
  
  adminStorage:boolean=false;

  listarUsuarios() {
    //para expandir/especializar las variables usamos ` y no ' o "
    //Las variables salen pintadas de otro color diferente del de texto
    //return this.http.get(`${this.API_URI}/list`);
    //si no funciona usar 
    return this.http.get(this.API_URI+'/list');
    // return this.usuarios;
  }

  loginUsuario(usuario:Usuario){
    return this.http.post(`${this.API_URI}/login/`,usuario);
  }

  setToken(token:string){
    localStorage.setItem('token',token);
  }

  getToken() {//Obtenemos el token que despues enviara el interceptor x cada req
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }
  
  logOut() {
    localStorage.removeItem('token');
  }

  // userExists(nombre: string, password: string): boolean {

  //   for (let i = 0; i < this.usuarios.length; i++) {
  //     if (nombre == this.usuarios[i].nombre && password == this.usuarios[i].password) {
  //       localStorage.setItem("Rol", JSON.stringify(this.usuarios[i].rol));
  //       if(this.usuarios[i].rol=='admin'){
  //         this.adminStorage=true;
  //       }
  //       return true;
  //     }
  //   } return false;
  // }

}

