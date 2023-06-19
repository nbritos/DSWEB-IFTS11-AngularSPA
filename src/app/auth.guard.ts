import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: UsuariosService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.isLoggedIn()) { return true }
    this.router.navigate(['smb']);
    return false;
  }
}
