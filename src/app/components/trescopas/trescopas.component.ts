import { Component, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IProvincia } from 'src/app/models/provinciaModel';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-trescopas',
  templateUrl: './trescopas.component.html',
  styleUrls: ['./trescopas.component.css']
})

export class TrescopasComponent implements OnInit{

  titulo: string = "tresCopas";

  provincias: IProvincia[] = []
  id_select: number = 1;
  indice: number = 0;
<<<<<<< HEAD
  provinciaNueva: IProvincia = {};
  actual:IProvincia={};

  //*Variables para validar */
=======

  provinciaNueva: IProvincia = {};
  actual: IProvincia = {};

  //*Variables para validar provincia a actualizar */
  errorNombreActual = 0;
  errorCapitalActual = 0;
  errorSInteresActual = 0;
  //************************/


  //*Variables para validar provincia nueva */
>>>>>>> 96b6670960c117b684dcd3287460ead8abf29897
  errorNombre = 0;
  errorCapital = 0;
  errorSInteres = 0;
  //************************/


  constructor(private provinciaService: ProvinciaService) {
    this.provincias=[];
    console.log(this.provincias);
  }

<<<<<<< HEAD
  //*******************************//
  ngOnInit(): void {
    this.provinciaService.listProvincias().subscribe(
      (res: any) => {
        console.log(res)
        this.provincias = (res);

        console.log(this.provincias);
      }
    );
  }
  //*******************************//

  agregarProvincia(): void {
    const provinciaAAgregar: IProvincia = {};
    provinciaAAgregar.nombre = this.provinciaNueva.nombre;
    provinciaAAgregar.capital = this.provinciaNueva.capital;
    provinciaAAgregar.sInteres = this.provinciaNueva.sInteres;
    this.provinciaService.createProvincia(provinciaAAgregar);
=======
  ngOnInit(): void { }
  //*******************************//

  agregarProvincia(): void {
    this.provinciaNueva.id = (this.provincias.length + 1);
    console.log(this.provinciaNueva.id);
    this.provincias.push(this.provinciaNueva);
    this.provinciaService.guardarProvincias(this.provincias);
    this.provinciaService.guardarProvinciasLocal();
    console.log(this.provincias);
>>>>>>> 96b6670960c117b684dcd3287460ead8abf29897
  }

  eliminar($event: any) {
    let id: number = $event.target.value; //Guardamos el id del boton
    for (let i = 0; i < this.provincias.length; i++) { //recorremos el array.
      if (this.provincias[i].id == id) {//buscamos coincidencia de id.
        this.provincias.splice(i, 1);//Cuando encuentra, elimina y sale del ciclo.
        break;
      }
    }
    console.log(this.provincias);
  }

  actualizar() {
<<<<<<< HEAD
    console.log("Elige: " + this.id_select);
    console.log(this.provincias);
    this.provinciaService.updateProvincia(this.id_select,this.actual).subscribe(
      (res:any)=>{
        console.log(res.text);
        this.ngOnInit();
      }
      
    );
  }

=======
    // console.log("Elige: " + this.id_select)
    this.actual.id=this.indice;
    // console.log(this.actual);
    this.provincias[this.indice]= this.actual;
    this.provinciaService.guardarProvincias(this.provincias);
    // this.provinciaService.guardarProvinciasLocal();
    this.provincias=this.provinciaService.listarProvincias();
  }

  //*******************************//

>>>>>>> 96b6670960c117b684dcd3287460ead8abf29897
  seleccionaValor($event: any) {
    console.log("Elige: " + this.id_select)
    for (let i = 0; i < this.provincias.length; i++) {
      if (this.id_select == this.provincias[i].id) {
        this.indice = i;
        break;
      }
    }
    console.log(this.indice);
  }

  //*******************************//

  //*Métodos para validar */
  validarCampos(): Boolean {
    console.log("Validando los campos del formulario!!!");
    this.errorNombre = this.verificarNombre(this.provinciaNueva.nombre);
    this.errorCapital = this.verificarCapital(this.provinciaNueva.capital);
    this.errorSInteres = this.verificarSInteres(this.provinciaNueva.sInteres);
    if ((this.errorNombre + this.errorCapital + this.errorSInteres) > 0) {
      return false;
    }
    return true;
  }

  private verificarNombre(palabra: any): number {
    const patron = /^[A-Z][A-z,a-z\s]+$/; //Primer caracter en mayuscular alternando luego
    if (palabra === undefined)
      return 1;
    if (palabra.length > 20)
      return 2;
    if (!patron.test(palabra))
      return 3;
    return 0;
  }

  private verificarCapital(palabra: any): number {
    const patron: RegExp = /^[A-Z][A-z,a-z\s]+$/; //Primer caracter en mayuscular alternando luego
    if (palabra === undefined)
      return 1;
    if (palabra.length > 20)
      return 2;
    if (!patron.test(palabra))
      return 3;
    return 0;
  }

  private verificarSInteres(palabra: any): number {
    const patron: RegExp = /^[A-Z][A-z,a-z\s]+$/;
    if (palabra === undefined)
      return 1;
    if (palabra.length > 20)
      return 2;
    if (!patron.test(palabra))
      return 3;
    return 0;
  }

  //************************/

<<<<<<< HEAD
=======
  //*Métodos para validar provincia a actualizar*/
  validarCamposActual(): Boolean {
    console.log("Validando los campos del formulario!!!");
    this.errorNombreActual = this.verificarNombreActual(this.actual.nombre);
    this.errorCapitalActual = this.verificarCapitalActual(this.actual.capital);
    this.errorSInteresActual = this.verificarSInteresActual(this.actual.sInteres);
    if ((this.errorNombreActual + this.errorCapitalActual + this.errorSInteresActual) > 0) {
      return false;
    }
    return true;
  }

  private verificarNombreActual(palabra: any): number {
    const patron = /^[A-Z][A-z,a-z\s]+$/; //Primer caracter en mayuscular alternando luego
    if (palabra === undefined)
      return 1;
    if (palabra.length > 20)
      return 2;
    if (!patron.test(palabra))
      return 3;
    return 0;
  }

  private verificarCapitalActual(palabra: any): number {
    const patron: RegExp = /^[A-Z][A-z,a-z\s]+$/; //Primer caracter en mayuscular alternando luego
    if (palabra === undefined)
      return 1;
    if (palabra.length > 20)
      return 2;
    if (!patron.test(palabra))
      return 3;
    return 0;
  }

  private verificarSInteresActual(palabra: any): number {
    const patron: RegExp = /^[A-Z][A-z,a-z\s]+$/;
    if (palabra === undefined)
      return 1;
    if (palabra.length > 20)
      return 2;
    if (!patron.test(palabra))
      return 3;
    return 0;
  }

  //************************/
  //*Métodos para limpiar campos*/

>>>>>>> 96b6670960c117b684dcd3287460ead8abf29897
  limpiarNombre() {
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.provinciaNueva.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarCapital() {
    if (this.errorCapital > 0) {
      console.log("Limpiar capital");
      this.provinciaNueva.capital = "";
      this.errorCapital = 0;
    }
  }

  limpiarSInteres() {
    if (this.errorSInteres > 0) {
      console.log("Limpiar sitio de interés");
      this.provinciaNueva.sInteres = "";
      this.errorSInteres = 0;
    }
<<<<<<< HEAD

  }

  //************************/


=======
  }

  //************************/
>>>>>>> 96b6670960c117b684dcd3287460ead8abf29897
}
