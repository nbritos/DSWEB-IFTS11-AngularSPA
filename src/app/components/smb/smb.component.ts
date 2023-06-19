import { Component } from '@angular/core';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-smb',
  templateUrl: './smb.component.html',
  styleUrls: ['./smb.component.css']
})
export class SmbComponent {

  constructor(private provinciaService:ProvinciaService){
    // this.provinciaService.setToken();
  }
}
