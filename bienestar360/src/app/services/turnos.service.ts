import { Injectable, OnInit } from '@angular/core';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnosService implements OnInit {
  private readonly STORAGE_KEY = 'turnos';
  turnos: Turno[] = new Array();
  constructor() { }
  ngOnInit() {
    this.loadTurnosFromStorage();
  }

  private obtenerTurnosporId(id: number): Turno[] {
    var turnosFiltrados: Turno[] = new Array();
    this.loadTurnosFromStorage();
    if (typeof window !== 'undefined') {
      turnosFiltrados = this.turnos.filter(t => t.nroProfesional === id);
      }
    return turnosFiltrados;
  }

  private guardarTurnoEnLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.turnos));
    }
  }

  private loadTurnosFromStorage() {
    if (typeof window !== 'undefined') {
      const storedTurnos = localStorage.getItem(this.STORAGE_KEY);
      if (storedTurnos) {
        this.turnos = JSON.parse(storedTurnos);
      }
    }
  }

  getAllTurnos(): Promise<Turno[]> {
    return new Promise((resolve, reject) => {

      if (this.turnos.length > 0) { resolve(this.turnos); }

      else { reject([]);}
    });
  }

  insertarTurno(tur: Turno): Promise<Turno[]> {
    console.log("insertando", tur);
    return new Promise((resolve, reject) => {
      this.turnos.push(tur);
      // Resolver la promesa con el turno 
      this.guardarTurnoEnLocalStorage();
    resolve(this.turnos);
    });
  }

  anularTurno(tur: Turno): Promise<Turno[]> {
    return new Promise((resolve, reject) => {
      var index = this.turnos.findIndex((t) => { t.numero == tur.numero });
      if (index != -1) {
        this.turnos.splice(index, 1);
      }
      // Resolver la promesa con el turno 
      this.guardarTurnoEnLocalStorage();
      resolve(this.turnos);
    });
  }

  actualizarTurno(tur: Turno): Promise<Turno[]> {
    return new Promise((resolve, reject) => {
    var index = this.turnos.findIndex((t) => { t.numero == tur.numero });
      if (index != -1) {
        this.turnos[index] = tur;
      }
      // Resolver la promesa con el turno 
      this.guardarTurnoEnLocalStorage();
      resolve(this.turnos);
    });
  }
 
}
