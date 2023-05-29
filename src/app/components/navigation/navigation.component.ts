import { Component } from '@angular/core';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private usuarioService: UsuariosService, private router: Router) {
    this.usuarioService.setToken();
    // this.usuarioService.isLoggedIn();
  }


  accesoProvincias(): boolean {
    return this.usuarioService.isLoggedIn();
  }

  smbAyuda(): void {
    console.log('smb');
    this.usuarioService.setToken();
  }

  logOut() {
    this.usuarioService.logOut();
    console.log("cerrando sesión!!");
    this.router.navigate(['home']);
  }

}
