import { Injectable } from '@angular/core';
import { Profesional } from '../models/profesional';
import { diaDeCalendario } from '../models/diaDeCalendario';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private STORAGE_KEY_PROFESIONALES = 'profesional';
  profesional: Profesional = new Profesional();
  profesionales: Profesional[] = new Array();
  constructor() { }

  private guardarProfesionalEnLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY_PROFESIONALES, JSON.stringify(this.profesionales));
    }
    this.loadProfesionalesFromStorage();
  }

  private loadProfesionalesFromStorage() {
    if (typeof window !== 'undefined') {
      const storedProfesionales = localStorage.getItem(this.STORAGE_KEY_PROFESIONALES);
      if (storedProfesionales) {
        
        this.profesionales = JSON.parse(storedProfesionales);
        console.log("asignando profesioanles array", this.profesionales);
      }
    }
  }
  public cantidadProfesionales(): number {
    var cantidad: number = 0;
  if (typeof window !== 'undefined') {
    const storedProfesionales = localStorage.getItem(this.STORAGE_KEY_PROFESIONALES);
    if (storedProfesionales) {
      this.profesionales = JSON.parse(storedProfesionales);
      cantidad = this.profesionales.filter(pro => pro.esProfesional === true).length;
    }
    }
    return cantidad;
}

  public cantidadUsuarios(): number {
    var cantidad: number = 0;
    if (typeof window !== 'undefined') {
      const storedProfesionales = localStorage.getItem(this.STORAGE_KEY_PROFESIONALES);
      if (storedProfesionales) {
        this.profesionales = JSON.parse(storedProfesionales);
        cantidad = this.profesionales.filter(pro => pro.esProfesional === false).length;
      }
    }
    return cantidad;
  }


  getAllProfesionales(): Promise<Profesional[]> {
    this.loadProfesionalesFromStorage();
    return new Promise((resolve, reject) => {
      if (this.profesionales.length > 0) {
        resolve(this.profesionales);
      } else {
        reject([]);
      }
    });
  }

  insertarProfesional(pro: Profesional): Promise<Profesional[]> {
    return new Promise((resolve, reject) => {
      this.profesionales.push(pro);
      this.guardarProfesionalEnLocalStorage();
      console.log("profesionales", this.profesionales)
      resolve(this.profesionales);
    });

  }

  anularProfesional(id: number): Promise<Profesional[]> {
    return new Promise((resolve, reject) => {
      var index = this.profesionales.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.profesionales.splice(index, 1);
      }
      this.guardarProfesionalEnLocalStorage();
      resolve(this.profesionales);
    });
  }

  actualizarProfesional(pro: Profesional): Promise<Profesional[]> {
    return new Promise((resolve, reject) => {
      var index = this.profesionales.findIndex((p) => p.id === pro.id);
      if (index !== -1) {
        this.profesionales[index] = pro;
        console.log("actualizando profesional", pro);
      }
      this.guardarProfesionalEnLocalStorage();
      resolve(this.profesionales);
    });
  }

  buscarProfesionalPorId(id: number): Promise<Profesional | undefined> {
    return new Promise((resolve, reject) => {
      const profesionalEncontrado = this.profesionales.find((p) => p.id === id);
      resolve(profesionalEncontrado);
    });
  }
  buscarProfesionalPorNombreYClave(nombre: string, clave: string): Promise<Profesional | undefined> {
    this.loadProfesionalesFromStorage();

    console.log("profesionales", this.profesionales)
    console.log("buscando usuario", nombre, " ", clave);
    return new Promise((resolve, reject) => {
      const profesionalEncontrado = this.profesionales.find((p) => ((p.nombre == nombre) && (p.clave == clave)));
      resolve(profesionalEncontrado);
    });
  }

  obtenerTurnosDeProfesional(id: number): diaDeCalendario[] {
    this.loadProfesionalesFromStorage();
    const soloProfesionales = this.profesionales.filter((p) => p.esProfesional == true);
    const profesionalEncontrado = soloProfesionales.find((p) => p.id === id);
    if (typeof window !== 'undefined' && window.localStorage) {
      const turnosDelMes = profesionalEncontrado?.dias;
      if (turnosDelMes)
      return turnosDelMes;
    }
    return [];
  }

  reservarTurno(pro: Profesional, paciente: Profesional, turno: Turno) {
    console.log("reservando turno");
    //console.log("voy a buscar en prodias ", turno.fecha?.getDate())
    //console.log("en pro", pro.dias)
     
        //necesito encontrar el turno al cual el paciente se refiere
      var turnosDeEseDia = pro.dias.find(d => d.dia.numero == turno.fecha?.getDate())?.turnos;
    var indiceturnoDia = pro.dias.findIndex(d => d.dia.numero == turno.fecha?.getDate());
    console.log("el inidice del turnoDia es", indiceturnoDia);
        //si ese turno existe
    console.log("ahora busco en turnos", turnosDeEseDia)
    console.log("estte numero", turno.numero)
      if (turnosDeEseDia?.findIndex(t => t.numero == turno.numero) != -1) {
        let indiceturno = turnosDeEseDia?.findIndex(t => t.numero == turno.numero);
        console.log("indice del turno es", indiceturno);
        if (turnosDeEseDia && indiceturno) {
          turnosDeEseDia[indiceturno].disponible = false;
          turnosDeEseDia[indiceturno].nombreUsuario = paciente.nombre;
          turnosDeEseDia[indiceturno].fecha = turno.fecha;
          turnosDeEseDia[indiceturno].duracion = turno.duracion;
          turnosDeEseDia[indiceturno].horarioH = turno.horarioH;
          pro.dias[indiceturnoDia].turnos = turnosDeEseDia;
          this.actualizarProfesional(pro);
           }
        }
      console.log("actualizando profesional", pro);
      this.guardarProfesionalEnLocalStorage();
  }

}
