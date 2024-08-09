import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ContactoComponent } from '../../contacto/contacto/contacto.component';
import { CatalogoComponent } from '../../catalogo/catalogo/catalogo.component';
import { FaqsComponent } from '../../faqs/faqs/faqs.component';
import { ProfesionalesComponent } from '../../profesionales/profesionales/profesionales.component';
import { QuienesSomosComponent } from '../../quienesSomos/quienes-somos/quienes-somos.component';
import { TurnosComponent } from '../../turnos/turnos/turnos.component';
import { FooterComponent } from '../footer/footer.component';
import { InicioComponent } from '../../inicio/inicio.component';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatButtonModule, ContactoComponent,
    CatalogoComponent, FaqsComponent,
    ProfesionalesComponent, QuienesSomosComponent, TurnosComponent, FooterComponent, InicioComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent  {
  @Output() menuOption = new EventEmitter<string>();
  selectedComponent: string = 'inicio';
 
  
  selectComponent(component: string) {
    this.selectedComponent = component;
    this.menuOption.emit(component);
  }
}
