import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './quienes-somos.component.html',
  styleUrl: './quienes-somos.component.css'
})
export class QuienesSomosComponent {
  words: string[] = ['Compromiso', 'Innovación', 'Calidad', 'Confianza'];
}
