//en este service guardo el estado actual de la aplicacion,
//usuario actual que esta logueado
//turnos que tiene ese usuario

import { Injectable, OnInit } from '@angular/core';
import { Profesional } from '../models/profesional';
import { UsuariosService } from './usuarios.service';
import { CacheTurnosService } from './cache-turnos.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService implements OnInit{
  usuarioActual: Profesional = new Profesional();
  private  STORAGE_KEY = "usuarioActual";
  constructor(private usuariosService: UsuariosService, private turnocacheService: CacheTurnosService) { }
  ngOnInit() { }

  public actualizarEnCache(prof: Profesional): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prof));
    }
    this.loadProfFromStorage();
  }

  public getUsuarioActual(): Profesional {
    this.loadProfFromStorage();
    return this.usuarioActual;
  }

  private loadProfFromStorage() {
    if (typeof window !== 'undefined') {
      const usuarioActual = localStorage.getItem(this.STORAGE_KEY);
      if (usuarioActual) {
        this.usuarioActual = JSON.parse(usuarioActual);
        console.log("se actualizo usuario", this.usuarioActual);
      }
    }
  }


}
