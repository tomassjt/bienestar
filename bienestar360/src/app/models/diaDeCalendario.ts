import { dia } from "./dia";
import { mes } from "./mes";
import { anio } from "./anio";
import { Turno } from "./turno";
export class diaDeCalendario {
  id: number | undefined;
  dia: dia;
  mes: mes; 
  anio: anio;
  fecha: Date;
  turnos: Turno[];
  profesionalId: number;

  constructor() {
    this.dia = new dia();
    this.mes = new mes();
    this.anio = new anio();
    this.fecha = new Date();
    this.turnos = new Array();
    this.profesionalId = 0;
  }
}
