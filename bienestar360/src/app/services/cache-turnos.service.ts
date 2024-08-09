import { Injectable } from '@angular/core';
import { diaDeCalendario } from '../models/diaDeCalendario';

@Injectable({
  providedIn: 'root'
})
export class CacheTurnosService {

  constructor() { }

  guardarEnCache(turnosDelMes: diaDeCalendario[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('turnosDelMes', JSON.stringify(turnosDelMes));
    }
  }

  obtenerDeCache(): diaDeCalendario[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const turnosDelMes = localStorage.getItem('turnosDelMes');
      return turnosDelMes ? JSON.parse(turnosDelMes) : [];
    }
    return [];
  }

  limpiarCache(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('turnosDelMes');
    }
  }

}
