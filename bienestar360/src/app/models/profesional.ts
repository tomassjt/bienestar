import { diaDeCalendario } from "./diaDeCalendario";

export class Profesional {
  id: number   | any;
  nombre: string  | any;
  especialidad: string  | any;
  dias: diaDeCalendario[] | any;
  esProfesional: boolean | any;
  clave: string | any;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.especialidad = '';
    this.dias = [];
    this.esProfesional = false;
    this.clave = '';
  }
}
