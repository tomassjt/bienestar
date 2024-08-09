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
import { UsuariosService } from '../../../services/usuarios.service';
import { Profesional } from '../../../models/profesional';
import { CacheTurnosService } from '../../../services/cache-turnos.service';
import { EstadoService } from '../../../services/estado.service';
 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
  
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule, MatFormFieldModule,
    MatSelectModule, MatButtonModule,
    ReactiveFormsModule, FormsModule,
    MatStepperModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, CommonModule, CalendarioComponent
 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuarioNoExiste: boolean = false;
  formGrup = this._formBuilder.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required]
  });
  usuario: string = "";
  clave: string = "";
  profesiona: Profesional = new Profesional();
  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private cacheTurnosService: CacheTurnosService,
    private estadoService: EstadoService) {


  }

  ngOnInit() {
    this.formGrup.get('usuario')?.valueChanges.subscribe(value => {
      
      if (value)
        this.usuario = value;
    });
    this.formGrup.get('clave')?.valueChanges.subscribe(value => {
       
      if (value)
        this.clave = value;
    });
  }

  irAlInicio() {
    this.usuariosService.buscarProfesionalPorNombreYClave(this.usuario, this.clave).then((u) => {
      
      //si el usuario existe
      if (u != undefined) {
        //debemos actualizar cache con todos los datos del usuario, turnos, nombres etc.
        this.estadoService.actualizarEnCache(u);
        this.usuarioNoExiste = false;
        if (u.esProfesional) {
          this.router.navigate(['admin']);
        }
        else {
          this.router.navigate(['']);
        }
      }

      //si el suuario no existe
      else {
        this.usuarioNoExiste = true;
      }

    })

    
   
   
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    const background = document.getElementById('background') as HTMLElement;
    if (background) {
      const rotationX = y * 10; // Ajusta el factor de rotación según desees
      const rotationY = -x * 10; // Ajusta el factor de rotación según desees
      background.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
  }
}
