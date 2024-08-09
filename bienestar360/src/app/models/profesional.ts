import { diaDeCalendario } from "./diaDeCalendario";

export class Profesional {
  id: number   | any;
  nombre: string  | any;
  especialidad: string  | any;
  dias: diaDeCalendario[];
  esProfesional: boolean | any;
  clave: string | any;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.especialidad = '';
    this.dias = new Array();
    this.esProfesional = false;
    this.clave = '';
  }
}
