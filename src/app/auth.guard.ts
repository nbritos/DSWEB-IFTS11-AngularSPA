import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ProvinciaService } from './services/provincia.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: ProvinciaService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.isLoggedIn()) { return true }
    this.router.navigate(['smb']);
    return false;
  }
}
