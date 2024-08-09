import { CommonModule, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MatStepperIntl, MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarioComponent } from '../calendario/calendario.component';
import { TurnosService } from '../../../services/turnos.service';
import { Turno } from '../../../models/turno';
import { EstadoService } from '../../../services/estado.service';
import { Profesional } from '../../../models/profesional';
import { UsuariosService } from '../../../services/usuarios.service';
 
@Component({
  selector: 'app-turnos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule,
    MatSelectModule, MatButtonModule,
    ReactiveFormsModule, FormsModule,
    MatStepperModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, CommonModule, CalendarioComponent


  ],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css'
})
export class TurnosComponent implements OnInit {
  listadoDeProfesionales: Profesional[] = new Array();

  reservedDates: Date[] = [];
  selectedTime: Time | undefined;

  turno: Turno = new Turno();
  turnos: Turno[] = new Array();
  habilitarCalendario: boolean = false;
  optionalLabelText: any;
  optionalLabelTextChoices: string[] = ['Option 1', 'Option 2', 'Option 3'];
  disableSelect = new FormControl(false);
  firstFormGroup = this._formBuilder.group({
    especialidad: ['', Validators.required],
    profesional: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    fecha: [null, Validators.required],
    hora: [null, Validators.required]
  });


  thirdFormGroup = this._formBuilder.group({
    fecha: ['', Validators.required],
  });

  profesional: string = "";
  fecha: Date | undefined = undefined;

  especialidad: string = "";
  horario: Time | undefined;
  existenTurnos: boolean = false;
  nombreUsuario: string = "Tomás J. Tomé"
  usuarioActual: Profesional = new Profesional();
  ngOnInit() {
    //obtenemos los datos preliminares como el usuario actual y la lista de profesionales
    this.obtenerListadoDeProfesionales();
    this.usuarioActual = this.estadoService.getUsuarioActual();
    this.precargaDeEspecialidades();
    console.log("usuario actual turnos", this.usuarioActual);

    this.firstFormGroup.get('especialidad')?.valueChanges.subscribe(value => {
      console.log('El valor de firstCtrl ha cambiado:', value);
      if (value)
        this.especialidad = value;
    });
    this.firstFormGroup.get('profesional')?.valueChanges.subscribe(value => {
      console.log('El valor de firstCtrl ha cambiado:', value);
      if (value)
        this.profesional = value;
    });

    this.secondFormGroup.get('fecha')?.valueChanges.subscribe(value => {
      console.log('El valor de fecha ha cambiado:', value);
      if (value)
        this.fecha = value;
    });

    this.secondFormGroup.get('hora')?.valueChanges.subscribe(value => {
      console.log('El valor de hora ha cambiado:', value);
      if (value)
        this.horario = value;
    });
  }
  constructor(
    private _formBuilder: FormBuilder,
    private _matStepperIntl: MatStepperIntl,
    private turnosService: TurnosService,
    private usuariosService: UsuariosService,
    private estadoService: EstadoService) { }

  onDateChange(event: any) {
    const selectedDate = event.value;
    if (!this.reservedDates.some(date => this.isSameDay(date, selectedDate))) {
      this.reservedDates.push(selectedDate);
    }
  }

  verificarExistenciaDeTurnos() {
    this.existenTurnos = false;
    this.turnosService.getAllTurnos().then((t) => {
      if (t.length > 0) {
        this.turnos = t;
        this.existenTurnos = true;
      }
    });
  }

  onTimeChange(event: any) {
    const selectedTime = event.target.value;
    console.log('Hora seleccionada:', selectedTime);
    this.turno.horario = selectedTime;
    console.log("lo que va del turno", this.turno);
  }



  isSameDay(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  updateOptionalLabel() {
    this._matStepperIntl.optionalLabel = this.optionalLabelText;
    // Required for the optional label text to be updated
    // Notifies the MatStepperIntl service that a change has been made
    this._matStepperIntl.changes.next();
  }


  mostrarCalendario() {
    this.turno = new Turno();
    this.turno.especialidad = this.especialidad;
    this.turno.profesional = this.profesional;
    this.turno.horarioH = this.horario;
    this.turno.fecha = this.fecha;
    this.turno.nombreUsuario = this.nombreUsuario;
    this.turno.nroProfesional = 1;
    console.log("lo que va del turno", this.turno);
    console.log("turno completo", this.turno);
    console.log("turno completo", this.turno);
    this.usuarioActual.dias.push(this.turno);
    this.estadoService.actualizarEnCache(this.usuarioActual);
    this.turnosService.insertarTurno(this.turno);

    this.habilitarCalendario = true;
    setTimeout(() => {
      this.verificarExistenciaDeTurnos();
      const targetElement = document.getElementById("calendar");

      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        this.smoothScroll(window, targetPosition, 1000); // Desplazar en 1000ms
      }
    }, 100)


  }

  smoothScroll(element: any, target: number, duration: number) {
    const start = element.scrollY;
    const change = target - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, duration);
      element.scrollTo(0, val);
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }


  // Extrae la palabra del día de la semana
  getDayName(numero: Date | undefined): string {

    const daysOfWeek: string[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    if (numero != null) {
      return daysOfWeek[numero.getDate()];
    }
    else {
      return "";
    }
  }
  formatearFecha(fecha: Date | undefined): string {
    if (fecha != undefined) {
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear();

      return `${dia}-${mes}-${anio}`;
    }
    else {
      return "";
    }
  }
  //creo una funcion apra obtener el listado de profesionales
  //para poder obtener los listados de especialidades y
  //profesionales en si 
  obtenerListadoDeProfesionales() {
      this.usuariosService.getAllProfesionales().then((prof) => {
        this.listadoDeProfesionales = prof.filter((p) => p.esProfesional == true);
        console.log("Listado de profesionales:", this.listadoDeProfesionales);
    });
  }

  precargaDeEspecialidades() {
    
    this.listadoDeProfesionales.forEach((p) => {
      p.especialidad
    
    })
  }




  }
