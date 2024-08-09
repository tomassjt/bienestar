import { Component, OnInit } from '@angular/core';
import { BtnVolverComponent } from '../shared/btn-volver/btn-volver.component';
import { CalendarioComponent } from '../turnos/calendario/calendario.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { Turno } from '../../models/turno';
import { Profesional } from '../../models/profesional';
import { diaDeCalendario } from '../../models/diaDeCalendario';
import { CacheTurnosService } from '../../services/cache-turnos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { EstadoService } from '../../services/estado.service';
@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [BtnVolverComponent, CalendarioComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTableModule,
    CommonModule,
    MatIconModule],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit {
  diaSeleccionado: diaDeCalendario = new diaDeCalendario();
  turnosDelMes: diaDeCalendario[] = new Array();

  ngOnInit() {
    this.profesional.nombre = "Tomas J. Tome";
    this.profesional.id = 1234;
    this.profesional.especialidad = "Ginecologo";


    this.dias = this.obtenerDiasDeSemana(this.mes, this.anio, this.semanaSeleccionada);
    //preasigno algunos valores a diaSeleccionado que son todos iguales
    this.diaSeleccionado.mes.palabra = this.mesActual;
    this.diaSeleccionado.mes.numero = this.mes;
    this.diaSeleccionado.anio.numero = this.anio;
    this.diaSeleccionado.profesionalId = this.profesional.id;
    this.turnosDelMes = this.cacheTurnosService.obtenerDeCache();
 


  }

  onValueChange(newValue: any) {
    //console.log('Value changed:', newValue);
    var numeroSemana: number = newValue;
    this.semanaSeleccionada = numeroSemana;
    this.dias = this.obtenerDiasDeSemana(this.mes, this.anio, this.semanaSeleccionada);
    
    //console.log('Días de la semana seleccionada:', this.dias);
    // Aquí puedes agregar la lógica para manejar el cambio de valor
  }

  constructor(private cacheTurnosService: CacheTurnosService,
    private usuarioService: UsuariosService,
    private estadoService: EstadoService) {
    this.usuarioActual = this.estadoService.getUsuarioActual();
    console.log("usuario actual admin", this.usuarioActual);
    this.generateData();
  }
  //configuraicon slider
  usuarioActual: Profesional = new Profesional();
  disabled = false;
  max = 60;
  min = 10;
  showTicks = true;
  step = 10;
  thumbLabel = false;
  value = 10;
  value2 = 0;
  checkedT = false;
  disabledT = false;
  dias: number[] = [];
  fechaActual = new Date();
  mes = this.fechaActual.getMonth() + 1; // Los meses son 0-indexed, por lo que sumamos 1
  anio = this.fechaActual.getFullYear();
  semanaSeleccionada = this.value2; // Segunda semana
  usuario: string = "Roberto Carlos";
  meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  mesActual = this.meses[this.fechaActual.getMonth()];
  displayedColumns: string[] = ['turno',   'action'];
  dataSource: Turno[] = [];
  profesional: Profesional = new Profesional();

  cambiarSemana(nuevaSemana: any) {
    //console.log("entro")
    this.semanaSeleccionada = nuevaSemana;
    //console.log('Semana seleccionada:', this.semanaSeleccionada);
    // Aquí puedes agregar la lógica para obtener los días de la semana seleccionada, por ejemplo:
    const dias = this.obtenerDiasDeSemana(8, 2024, this.semanaSeleccionada);
    //console.log('Días de la semana seleccionada:', dias);
  }

  duracionTurnoChange(duracion: number) {
    this.generateData();
  }

  generateData() {
    this.dataSource = [];
    //console.log("cambiando datasource");
    const times = [
      ...this.generateTimeSlots('08:00', '12:00'),
      ...this.generateTimeSlots('16:00', '20:00')
    ];
    
    times.forEach((t, index) => {
     var turno: Turno = new Turno();
     turno.horario = t;
     turno.disponible = true;
     turno.numero = index;
     turno.nombreUsuario = this.usuario;
     turno.duracion = this.value;
     this.dataSource.push(turno);
   })
    //console.log(this.dataSource);
   
  }
 
  generateTimeSlots(start: string, end: string): string[] {
    const slots: string[] = [];
    let current = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    while (current < endTime) {
      slots.push(current.toTimeString().substring(0, 5));
      current.setMinutes(current.getMinutes() + this.value);
    }
    return slots;
  }

  toggleAvailability(row: Turno) {
    row.disponible = !row.disponible;
    var index = this.dataSource.findIndex((d) => d.numero == row.numero);
    //console.log("indice encontrado:", index);
    this.dataSource[index] = row;
    this.diaSeleccionado.turnos = this.dataSource;
    //console.log(this.diaSeleccionado.turnos);
    this.guardarConfigDelDia();
  }


  marcarDiaComoNoDisponible(e: MatSlideToggleChange) {
    
    this.dataSource.forEach((t) => {
 
        t.disponible = !e.checked ;
        
    });
    this.diaSeleccionado.turnos = this.dataSource;
    this.guardarConfigDelDia();
  }


  seleccionarDia(dia: string, diaNro: number) {
    this.diaSeleccionado = new diaDeCalendario();
    //console.log("seleccionaron dia",diaNro)
    this.diaSeleccionado.dia.palabra = dia;
    this.diaSeleccionado.dia.numero = diaNro;
    this.diaSeleccionado.turnos = this.dataSource;
    //console.log(this.diaSeleccionado);
    //si para el dia que elije del mes, ya tiene una cofiguracion guardada, la cargamos sin miedo al exito.
    //console.log("buscando entre los valores", this.turnosDelMes);
    //console.log("el dia seleccionado", diaNro)
    var index = this.turnosDelMes.findIndex((t) => t.dia.numero == diaNro);
    //console.log("indice:", index);
    if (index != -1) {
      this.dataSource = [];
      //console.log("recuperando datos y asignandolos en la tabla");
      //console.log(this.turnosDelMes[index].turnos);
      this.dataSource = this.turnosDelMes[index].turnos;
      
    }
    else {
      //console.log("gegenerando")
      this.generateData();
    }
   
  }

  guardarConfigDelDia() {

    //guardar el dia con todos los horarios
 /* this.diaSeleccionado.turnos = this.dataSource; */
    ////si era un dia ya existente lo actualizamos,si no, le damos para adelante nomas que para atras sale sola y pusheamos.
    ////console.log("buscaran en this.turnosDelMes", this.turnosDelMes)
    ////console.log("el dia seleccionado", this.diaSeleccionado)

    var index = this.turnosDelMes.findIndex((t) => t.dia.numero == this.diaSeleccionado.dia.numero);
    if (index !== -1) {
      this.turnosDelMes[index] = this.diaSeleccionado;
      console.log("actualizando");
    }
    else {
      console.log("guardando nuevo valor");
    console.log("a esto", this.turnosDelMes);
    //console.log("le meto esto", this.diaSeleccionado);
     this.turnosDelMes.push(this.diaSeleccionado);
    }
    console.log(this.turnosDelMes);
    this.guardarTurnosEnCache(this.turnosDelMes);
  }

  guardarTurnosEnCache(turnos: diaDeCalendario[]): void {
    this.cacheTurnosService.guardarEnCache(turnos);
  }

  obtenerNombreDiaSemana(dia: number): string {
    let anio: number = this.anio;
    let mes: number= this.mes;
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Crear un objeto Date usando los parámetros (restamos 1 al mes porque los meses en Date son 0-indexed)
  const fecha = new Date(anio, mes - 1, dia);

  // Obtener el día de la semana (0 es domingo, 1 es lunes, etc.)
  const diaSemana = fecha.getDay();

  // Devolver el nombre del día de la semana en español
  return diasSemana[diaSemana];
}

  obtenerDiasDeSemana(mes: number, anio: number, semanaSeleccionada: number): number[] {
    //console.log("calculando para semana", this.semanaSeleccionada);
  const dias: number[] = [];
  let semanaActual = 1;

  // Crear fecha para el primer día del mes
  let fecha = new Date(anio, mes - 1, 1);

  // Iterar sobre cada día del mes
  while (fecha.getMonth() === mes - 1) {
    const diaSemana = fecha.getDay(); // Obtener el día de la semana (0: Domingo, 1: Lunes, ..., 6: Sábado)

    // Si el día de la semana es Lunes (1) y no es el primer día del mes, incrementamos la semana actual
    if (diaSemana === 1 && fecha.getDate() > 1) {
      semanaActual++;
    }

    // Si el día es de lunes a viernes y estamos en la semana seleccionada, lo almacenamos
    if (diaSemana >= 1 && diaSemana <= 5 && semanaActual === semanaSeleccionada) {
      dias.push(fecha.getDate());
    }

    // Avanzar al siguiente día
    fecha.setDate(fecha.getDate() + 1);
  }

  return dias;
}

  guardar() {
    this.guardarTurnosEnCache(this.turnosDelMes);
    console.log("Guardando...");
    // Aquí va la lógica de guardado
  }



}
