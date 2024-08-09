import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-volver',
  standalone: true,
  imports: [],
  templateUrl: './btn-volver.component.html',
  styleUrl: './btn-volver.component.css'
})
export class BtnVolverComponent {
  constructor(private router: Router) {

  }

  volver() {
    this.router.navigate(['/']);
  }
}
