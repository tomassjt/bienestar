import { Time } from "@angular/common";

export class Turno {
  numero: number | undefined;
  profesional: string | undefined;
  nroProfesional: number = 0;
  especialidad: string | undefined;
  nombreUsuario: string = "";
  fecha: Date | undefined;
  hora: number | undefined;
  minutos: number | undefined;
  horarioH: Time | undefined;
  duracion: number | undefined;
  horario: string | undefined;
  disponible: boolean | undefined;
}
