import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { Turno } from '../../../models/turno';
import { Time } from '@angular/common';
import { TurnosService } from '../../../services/turnos.service';
 
@Component({
  selector: 'app-modal-horario',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    
     ],
  templateUrl: './modal-horario.component.html',
  styleUrl: './modal-horario.component.css'
})
export class ModalHorarioComponent implements OnInit {
  turnoVar: Turno = new Turno();
  selectedTime: Time | undefined;
  constructor(
    public dialogRef: MatDialogRef<ModalHorarioComponent>,
    @Inject(MAT_DIALOG_DATA) public turno: Turno,
    private turnosService: TurnosService) {
 
  }

  ngOnInit() {
    if (this.turno != null) {
      this.turnoVar = this.turno;
      console.log("turno recibido solo falta setear la hora ", this.turno);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



 
 

  reservar() {
    if (this.selectedTime) {
      console.log(this.selectedTime);
      this.turno.horarioH = this.selectedTime;
      console.log("turno completo", this.turno)
      this.turnosService.insertarTurno(this.turno);
    } else {
      alert('Por favor, selecciona una hora.');
    }
  }

}
