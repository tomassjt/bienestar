import { Component, Input, OnInit, input } from '@angular/core';
import { DiaCalendarioComponent } from '../dia-calendario/dia-calendario.component';
import { dia } from '../../../models/dia';
import Swal from 'sweetalert';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalHorarioComponent } from '../modal-horario/modal-horario.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TurnosService } from '../../../services/turnos.service';
import { Turno } from '../../../models/turno';
import { Profesional } from '../../../models/profesional';
import { EstadoService } from '../../../services/estado.service';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [DiaCalendarioComponent, MatFormFieldModule, MatDialogModule,
    MatInputModule, FormsModule, MatButtonModule, ModalHorarioComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent implements OnInit {
  dias: dia[] = new Array();
  animal: any;
  usuarioActual: Profesional = new Profesional();
  @Input() turno = new Turno(); 
  constructor(public dialog: MatDialog,
    private turnosService: TurnosService,
    private estadoService: EstadoService) {

  }

  ngOnInit() {
    this.usuarioActual = this.estadoService.getUsuarioActual();
    console.log("usuario actual turnos", this.usuarioActual);

    if (this.turno != null) {
      console.log("turno recibido del componente turnos valga la redundancia jeje", this.turno)
    }
    this.dias = this.obtenerDiasDelMes(7, 2024);
  }


  obtenerDiasDelMes(anio: number, mes: number): { numero: number, palabra: string }[] {
    const dias: { numero: number, palabra: string }[] = [];
    const fechaInicio = new Date(anio, mes - 1, 1); // mes - 1 porque los meses van de 0 a 11 en JavaScript

    // Determinar el día de inicio y la cantidad de días en el mes
    const primerDiaSemana = fechaInicio.getDay(); // 0 (domingo) a 6 (sábado)
    const cantidadDias = new Date(anio, mes, 0).getDate(); // Obtiene el último día del mes

    // Nombres de los días de la semana en español
    const diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

    // Generar el arreglo de días del mes
    for (let dia = 1; dia <= cantidadDias; dia++) {
      const nombreDia = diasSemana[(primerDiaSemana + dia - 1) % 7]; // Calcular el nombre del día
      dias.push({ numero: dia, palabra: nombreDia });
    }

    return dias;
  }

  showAlert() {
    Swal("Exelente!", "Su turno ah sido reservado con  éxito.", "success");
  }


  openDialog(dia: any): void {
    console.log("dia elegido", dia)
    this.turno.fecha = dia;
    console.log("lo que va del turno", this.turno);
    const dialogRef = this.dialog.open(ModalHorarioComponent, {
      data: this.turno,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      this.showAlert();

    });
  }


}
