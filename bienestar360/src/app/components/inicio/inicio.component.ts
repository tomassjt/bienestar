import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { IconoLoginComponent } from '../login/icono-login/icono-login.component';
import { Profesional } from '../../models/profesional';
import { EstadoService } from '../../services/estado.service';
 
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FooterComponent, IconoLoginComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  usuarioActual: Profesional = new Profesional();
  constructor(private estadoService: EstadoService) {

  }
    ngOnInit(): void {
      this.usuarioActual = this.estadoService.getUsuarioActual();
    }

 

}
