import { Component } from '@angular/core';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private provinciaService:ProvinciaService, private router:Router){
  }
  
  logOut(){
    this.provinciaService.logOut();
    console.log("cerrando sesión!!");
    this.router.navigate(['smb']);
  }
  
}
