import { Component, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IProvincia } from 'src/app/models/provinciaModel';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-trescopas',
  templateUrl: './trescopas.component.html',
  styleUrls: ['./trescopas.component.css']
})

export class TrescopasComponent implements OnInit {

  titulo: string = "tresCopas";

  provincias: IProvincia[] = []
  id_select: number = 1;
  indice: number = 0;
  provinciaNueva: IProvincia = {};
  actual: IProvincia = {};


  //*******************************//
  //*Variables para validar */
  errorNombre = 0;
  errorCapital = 0;
  errorDescripcion = 0;
  //************************/
  errorNombreActualizar = 0;
  errorCapitalActualizar = 0;
  errorDescripcionActualizar = 0;
  //*******************************//

  //constructor
  constructor(private provinciaService: ProvinciaService) {
    this.provincias = [];
    console.log(this.provincias);
  }

  //*******************************//

  //NGONINIT PARA READ
  ngOnInit(): void {
    this.provinciaService.listProvincias().subscribe(
      (res: any) => {
        console.log(res)
        this.provincias = (res);

        console.log(this.provincias);
      }
    );
  }

  //CREATE
  agregarProvincia(): void {
    const provinciaAAgregar: IProvincia = {};
    provinciaAAgregar.nombre = this.provinciaNueva.nombre;
    provinciaAAgregar.capital = this.provinciaNueva.capital;
    provinciaAAgregar.descripcion = this.provinciaNueva.descripcion;
    console.log(provinciaAAgregar);
    this.provinciaService.createProvincia(provinciaAAgregar);
  }

  //DELETE
  eliminar($event: any) {
    console.log($event.target.value);
    let id: string = $event.target.value; //Guardamos el id del boton
    this.provinciaService.deleteProvincia(parseInt(id)).subscribe(
      (res: any) => {
          this.ngOnInit();
          console.log(this.provincias);
          console.log('Provincia ELIMINADA  CON EXITO!')
      }
    );
  }

  //UPDATE
  actualizar() {
    console.log("Elige: " + this.id_select);
    console.log(this.provincias);
    this.provinciaService.updateProvincia(this.id_select, this.actual).subscribe(
      (res: any) => {
        console.log(res.text);
        this.ngOnInit();
        console.log('Provincia ACTUALIZADA CON EXITO!')
      }
    );
  }

  //*******************************//
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

  //*Métodos para validar provincia nueva*/

  validarCampos(): Boolean {
    console.log("Validando los campos del formulario!!!");
    this.errorNombre = this.verificarNombre(this.provinciaNueva.nombre);
    this.errorCapital = this.verificarCapital(this.provinciaNueva.capital);
    this.errorDescripcion = this.verificarSInteres(this.provinciaNueva.descripcion);
    if ((this.errorNombre + this.errorCapital + this.errorDescripcion) > 0) {
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
  //*******************************//

  //*Métodos para validar provincia a actualizar*/
  validarCamposActualizar(): void {
    console.log("Validando los campos del formulario actualizar..");
    this.errorNombre = this.verificarNombreActualizar(this.actual.nombre);
    this.errorCapital = this.verificarCapitalActualizar(this.actual.capital);
    this.errorDescripcion = this.verificarDescripcionActualizar(this.actual.descripcion);

    if ((this.errorNombre + this.errorCapital + this.errorDescripcion) > 0) {
      console.log("Existen errores en los campos, no se puede actualizar");
      return;
    }

    this.actualizar();
  }

  private verificarNombreActualizar(nombre: any): number {
    const patron = /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/; //Primer caracter en mayuscular alternando luego
    if (nombre === undefined)
      return 1;
    if (nombre.length > 20)
      return 2;
    if (!patron.test(nombre))
      return 3;
    return 0;
  }

  private verificarCapitalActualizar(nombre: any): number {
    const patron = /^[A-Za-záéíóúÁÉÍÓÚ\s]+$/; //Primer caracter en mayuscular alternando luego
    if (nombre === null)
      return 1;
    if (nombre.length > 30)
      return 2;
    if (!patron.test(nombre))
      return 3;
    return 0;
  }

  private verificarDescripcionActualizar(descripcion: any): number {
    const patron = /^[A-Za-záéíóúÁÉÍÓÚ\s\.\,ñÑ]+$/; // Primer caracter en mayúscula, permitir solo letras y espacios
    if (descripcion === undefined || descripcion.trim().length === 0) {
      return 1; // La descripción está vacía o no está definida
    }
    if (descripcion.length > 250) {
      return 2; // La descripción es demasiado larga (más de 50 caracteres)
    }
    if (!patron.test(descripcion)) {
      return 3; // La descripción contiene caracteres inválidos o no cumple con el patrón
    }
    return 0; // No hay errores
  }
  //*******************************//

  //*Métodos para limpiar campos provincia a agregar*/

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

  limpiarDescripcion() {
    if (this.errorDescripcion > 0) {
      console.log("Limpiar sitio de interés");
      this.provinciaNueva.descripcion = "";
      this.errorDescripcion = 0;
    }
  }

  //*Métodos para limpiar campos provincia a actualizar*/

  limpiarNombreActualizar() {
    if (this.errorNombreActualizar > 0) {
      console.log("Limpiar nombre");
      this.actual.nombre = "";
      this.errorNombreActualizar = 0;
    }
  }

  limpiarCapitalActualizar() {
    if (this.errorCapitalActualizar > 0) {
      console.log("Limpiar Capital");
      this.actual.capital = "";
      this.errorCapitalActualizar = 0;
    }
  }

  limpiarDescripcionActualizar() {
    if (this.errorDescripcionActualizar > 0) {
      console.log("Limpiar Descripcion");
      this.actual.descripcion = "";
      this.errorDescripcionActualizar = 0;
    }
  }
}

  //************************/


