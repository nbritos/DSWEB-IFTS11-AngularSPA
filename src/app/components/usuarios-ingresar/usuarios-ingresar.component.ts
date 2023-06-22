import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarioModel';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
})
export class UsuariosIngresarComponent implements OnInit {

  nuevo: Usuario = {};
  revelar: boolean = false;//permite mostrar u ocultar formulario y mensaje de error.

  //onstructor inicializa el servicio, el enrutador y los campos necesarios para sesion.
  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.nuevo.nombre = "";
    this.nuevo.password = "";
  }

  limpiarUsuario() {
    this.nuevo.nombre = "";
  }

  limpiarPassword() {
    this.nuevo.password = "";
  }

  //Valida haciendo login en el back-end
  validarCampos(): boolean {
    console.log("Validando sesion");
    console.log(this.nuevo);
    this.usuariosService.loginUsuario(this.nuevo).subscribe(
      (res: any) => {
        console.log(res);
        if (res.login == "ok") {
          console.log("Login exitoso");
          //this.usuariosService.setToken();
          this.usuariosService.setToken(res.token);
          this.router.navigate(['usuarios/home']);
        }
      }
    );
    this.revelar = true;
    return false;
  }

  //Al dar click en el mensaje de error, lo oculta y vuelve a mostrar el formulario.
  reintentar() {
    this.revelar = false;
  }

  //Ingresar vuelve a setear el token para que el guardian lo vea
  //Tambien redirige al home.

  ingresar() {
    console.log("Iniciando sesion");
    //this.usuariosService.setToken();
    this.router.navigate(['usuarios/home']);
  }

  ngOnInit(): void {
  }

}
