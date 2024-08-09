import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

}
