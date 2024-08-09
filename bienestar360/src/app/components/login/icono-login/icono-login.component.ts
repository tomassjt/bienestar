import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EstadoService } from '../../../services/estado.service';
import { Profesional } from '../../../models/profesional';
@Component({
  selector: 'app-icono-login',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, MatFormFieldModule, ReactiveFormsModule ],
  templateUrl: './icono-login.component.html',
  styleUrl: './icono-login.component.css'
})
export class IconoLoginComponent implements OnInit {
  usuarioActual: Profesional = new Profesional();
  constructor(private router: Router, private estadoService: EstadoService) { }
  isMenuOpen = false;

  ngOnInit() {
    this.usuarioActual = this.estadoService.getUsuarioActual();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  irAInicioSession() {
 
    this.router.navigate(['login']);
 
  }
  irARegistrar() {

    this.router.navigate(['registrar']);

  }

  cerrarSession() {
    console.log("cerrando session")
    var usuarioVacio: Profesional = new Profesional();
    this.estadoService.actualizarEnCache(usuarioVacio);
    this.router.navigate(['login']);
  }

}
