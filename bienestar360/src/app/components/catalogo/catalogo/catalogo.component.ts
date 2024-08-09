import { Component } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { IconoLoginComponent } from '../../login/icono-login/icono-login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CategoriasComponent } from '../categorias/categorias.component';
import { CarrouselComponent } from '../carrousel/carrousel.component';
import { GaleriaComponent } from '../galeria/galeria.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductComponent,
            IconoLoginComponent,
            MatIconModule,
            MatInputModule,
            CategoriasComponent,
            CarrouselComponent,
            GaleriaComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  constructor(private router: Router) { }

  abrirCarrito() {
    this.router.navigate(['/carrito'])
  }
}
