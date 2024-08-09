 
import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CalendarioComponent } from '../../turnos/calendario/calendario.component';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { UsuariosService } from '../../../services/usuarios.service';
import { Profesional } from '../../../models/profesional';
import { BtnVolverComponent } from '../btn-volver/btn-volver.component';
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, MatFormFieldModule,
    MatSelectModule, MatButtonModule,
    ReactiveFormsModule, FormsModule,
    MatStepperModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, CommonModule, CalendarioComponent,
    MatSliderModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTableModule,
    BtnVolverComponent],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent implements OnInit {
  checkedT: boolean | undefined;
  disabledT: boolean | undefined;

  esProfesional: boolean = false;
  formGrup = this._formBuilder.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required],
    especialidad: ['', Validators.required],
    
    claveCUP:[0]
  });
  usuario: string = "";
  clave: string = "";
  claveCUP: number | undefined;
  usuarioR: Profesional = new Profesional();
  constructor(private router: Router, private _formBuilder: FormBuilder, private usuariosService: UsuariosService) { }
  ngOnInit() { }
  registrarUsuario() {
    if (this.esProfesional) {
      if (this.formGrup.get('claveCUP')?.value == 3030) {
        // Lógica para registrar al usuario como profesional
        console.log('Usuario registrado como profesional');
        this.guardarUser();
      }
      else {
        this.formGrup.get('claveCUP')?.value
        console.log('Clave CUP incorrecta es 3030 xD');
      }
    }
    else {
      // Lógica para registrar al usuario normalmente o mostrar un mensaje de error
      console.log('Usuario registrado como usuario común');
      this.guardarUser();
    }
  }
  esProfecionalCkech(e: MatSlideToggleChange) {
    this.esProfesional = e.checked;
  }
  guardarUser() {
  
    this.usuarioR.clave = this.formGrup.get('clave')?.value;
    this.usuarioR.nombre = this.formGrup.get('usuario')?.value;
    this.usuarioR.esProfesional = this.esProfesional;
    if (this.esProfesional) {
      this.usuarioR.especialidad = this.formGrup.get('especialidad')?.value;
      this.usuarioR.id = this.usuariosService.cantidadProfesionales() + 1;
    }
    else {
      this.usuarioR.especialidad = '';
      this.usuarioR.id = this.usuariosService.cantidadUsuarios() + 1;
    }

    this.usuariosService.insertarProfesional(this.usuarioR).then((r) => {
      if (r.length > 0) {
        console.log(r)
        console.log("registrado con exito");
        this.router.navigate(['login']);
      }
    });

   

  }


}
